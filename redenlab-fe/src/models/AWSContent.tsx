class AWSContent {
    ChecksumAlgorithm: string[]
    ETag: string
    Key: string
    LastModified: Date
    Size: number
    StorageClass: string

    constructor(ChecksumAlgorithm: string[], ETag: string, Key: string, LastModified: Date, Size: number,
                StorageClass: string) {
        this.ChecksumAlgorithm = ChecksumAlgorithm
        this.ETag = ETag
        this.Key = Key
        this.LastModified = LastModified
        this.Size = Size
        this.StorageClass = StorageClass
    }
}

export default AWSContent