import {QuestStatus} from "../quest-status.model";

/**
 * Repository to manage user's currently started quests and their status
 */
export class QuestsStatusRepository {
    private startedQuests: QuestStatus[] = [];


    /**
     * Adds the given quest status to the list of started quests.
     *
     * @param {QuestStatus} questStatus - The quest status to be added.
     * @return {void} This method does not return a value.
     */
    add(questStatus: QuestStatus): void {
        this.startedQuests.push(questStatus);
    }


    /**
     * Retrieves a list of all currently started quests.
     *
     * @return {QuestStatus[]} An array of QuestStatus objects representing the currently started quests.
     */
    all(): QuestStatus[] {
        return this.startedQuests;
    }


    /**
     * Retrieves a quest status by its unique identifier.
     *
     * @param {string} id - The unique identifier of the quest status to retrieve.
     * @return {QuestStatus|undefined} The quest status with the matching ID, or undefined if no quest status is found.
     */
    get(id: string): QuestStatus | undefined {
        return this.startedQuests.find(qs => qs.id === id);
    }


    /**
     * Checks if a quest with the specified ID exists in the startedQuests list.
     *
     * @param {string} id - The unique identifier of the quest to look for.
     * @return {boolean} Returns true if a quest with the given ID exists, otherwise false.
     */
    has(id: string): boolean {
        return this.startedQuests.some(qs => qs.id === id);
    }
}