import {Quest} from "./quest.model";

export class QuestStatus {
    id: string;
    currentStage: number;


    /**
     * Converts a Quest object into a QuestStatus instance.
     *
     * @param {Quest} q - The Quest object to be converted.
     * @return {QuestStatus} A new QuestStatus instance with the initial stage set to 0.
     */
    static fromQuest(q: Quest): QuestStatus {
        const qs = new QuestStatus();
        qs.id = q.id;
        qs.currentStage = 0;
        return qs;
    }
}



export class ActiveQuest {
    quest: Quest;
    status: QuestStatus;
}
