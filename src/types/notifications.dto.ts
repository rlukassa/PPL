
export interface CreateNotificationDto { 
    user_id : number, 
    type : "INFO" | "SUCCESS" | "ERROR",
    payload: JSON
    is_read: boolean
}