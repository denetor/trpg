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

    constructor() {
        this.id = null as any;
        this.name = null as any;
        this.logEntry = null as any;
        this.category = null as any;
        this.factionId = null as any;
        this.stages = [];
        this.preconditions = [];
    }
}

export class QuestStage {
    id: number;
    logEntry: string;
    preconditions?: any[];
    onComplete?: any[];

    constructor() {
        this.id = null as any;
        this.logEntry = '';
        this.preconditions = [];
        this.onComplete = [];
    }
}
