export class Quest {
    id: string;
    name: string;
    logEntry: string;
    // quest category
    category?: string;
    // faction id if quest is related to a specific faction
    factionId?: string;
    // progress stages
    stages: QuestStage[];
    // precondition to start the quest
    preconditions: any[];
}

export class QuestStage {
    id: number;
    logEntry: string;
    preconditions?: any[];
    onComplete?: any[];
}
