import {QuestsRepository} from "../models/repositories/quests.repository";
import {Quest} from "../models/quest.model";
import {QuestsStatusRepository} from "../models/repositories/quests-status.repository";
import {QuestStatus} from "../models/quest-status.model";

export class QuestManagerService {


    constructor(
        private readonly questsRepository: QuestsRepository,
        private readonly questsStatusRepository: QuestsStatusRepository,
    ) {}



    /**
     * Retrieves all available quests from the quests repository.
     *
     * @return {Array<Object>} A list of quest objects retrieved from the repository.
     */
    getAllQuests(): Quest[] {
        return this.questsRepository.all();
    }


    /**
     * Initiates the start of a quest by its unique identifier. If the quest exists and has not been started, it adds the quest's status to the repository.
     *
     * @param {string} questId - The unique identifier of the quest to be started.
     * @return {void} This method does not return a value.
     */
    startQuest(questId: string): void {
        const quest = this.questsRepository.get(questId);
        if (quest && !this.questsStatusRepository.has(questId)) {
            this.questsStatusRepository.add(QuestStatus.fromQuest(quest));
        }
    }


    // TODO active quests list
    // TODO available quests list
    // TODO method to test conditions
    // TODO method to apply actions upon stage completion
}
