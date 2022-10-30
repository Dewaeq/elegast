export class BaseModel {
    id: number
    created: Date
    updated: Date
    htmlUrl: string

    static baseFromJson<T extends BaseModel>(model: T, json: Object): T {
        model.id = json['id']
        model.htmlUrl = json['html_url']
        model.created = new Date(json['created_at'])
        model.updated = new Date(json['pushed_at'])

        return model
    }
}