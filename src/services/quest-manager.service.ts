import {QuestsRepository} from "../models/repositories/quests.repository";
import {Quest, QuestStage} from "../models/quest.model";
import {QuestsStatusRepository} from "../models/repositories/quests-status.repository";
import {ActiveQuest, QuestStatus} from "../models/quest-status.model";

export class QuestManagerService {


    constructor(
        private readonly questsRepository: QuestsRepository,
        private readonly questsStatusRepository: QuestsStatusRepository,
    ) {}



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


    /**
     * Retrieves the active quest and its status by the specified quest ID.
     *
     * @param {string} questId - The unique identifier of the quest to be retrieved.
     * @return {{quest: Quest, status: QuestStatus} | undefined} An object containing the quest and its status if found, or undefined if either the quest or its status does not exist.
     */
    activeQuest(questId: string): ActiveQuest | undefined {
        const status = this.questsStatusRepository.get(questId);
        const quest = this.questsRepository.get(questId);
        if (!status || !quest) {
            return undefined;
        }
        return {
            quest,
            status,
        }
    }


    /**
     * Determines and returns the next stage in the active quest.
     *
     * @param {ActiveQuest} activeQuest - The active quest object containing the current quest and status data.
     * @return {QuestStage | undefined} The next stage of the quest if available, or undefined if there are no further stages or the input data is invalid.
     */
    nextStage(activeQuest: ActiveQuest): QuestStage | undefined {
        if (activeQuest.quest && activeQuest.status && activeQuest.quest.stages.length > 0) {
            for (let stage of activeQuest.quest.stages) {
                if (stage.id >= activeQuest.status.currentStage) {
                    return stage;
                }
            }
        }
        return undef
    }


    // TODO test if quest stage conditions are met
    testPreconditions(stage: QuestStage): boolean {
        if (!stage || !stage.preconditions || !stage.preconditions.length > 0) {
            return true;
        }
        for (const precondition of stage.preconditions) {
            // TODO implement precondition tests
        }
    }


    // TODO apply actions upon stage completion
    onComplete(stage: QuestStage): void {
        if (!stage || !stage.onComplete || !stage.onComplete.length > 0) {
            return;
        }
        for (let task of stage.onComplete) {
            // TODO implement task actions
        }
    }
}
