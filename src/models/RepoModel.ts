import { BaseModel } from "./BaseModel"

export class RepoModel extends BaseModel {
    name: string
    description: string
    homepage: string

    static fromJson(json: Object): RepoModel {
        const repo = new RepoModel()
        BaseModel.baseFromJson(repo, json)

        repo.name = json['name']
        repo.description = json['description']
        repo.homepage = json['homepage']

        return BaseModel.baseFromJson(repo, json)
    }
}