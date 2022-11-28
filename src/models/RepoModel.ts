import { BaseModel } from "./BaseModel"

export class RepoModel extends BaseModel {
    name: string
    description: string
    homepage: string
    defaultBranch: string

    static fromJson(json: Object): RepoModel {
        const repo = new RepoModel()
        BaseModel.baseFromJson(repo, json)

        repo.name = json['name']
        repo.description = json['description']
        repo.homepage = json['homepage']
        repo.defaultBranch = json['default_branch']

        return BaseModel.baseFromJson(repo, json)
    }
}