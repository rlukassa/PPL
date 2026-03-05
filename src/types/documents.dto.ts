
export interface CreateDocumentDto {
    lecturer_id : number, 
    file_path : string,
    title : string, 
    status : "WAITING" | "IN_REVIEW" | "SUCCESS"
}