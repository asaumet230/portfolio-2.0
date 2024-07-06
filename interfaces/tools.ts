
export interface ITool {
    image    : string;
    progress : number;
    title    : string;
}

export interface ToolResponse {
    ok      : boolean;
    message : string;
    tools   : ITool[]; 
}