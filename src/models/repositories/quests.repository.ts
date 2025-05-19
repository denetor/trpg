import {Quest} from "../quest.model";

/**
 * This is the repository of all quests available in the game world.
 */
export class QuestsRepository {
    private quests: Quest[] = [
        {
            id: 'quest.find.cemetery.clues',
            name: 'Finding my ancestors',
            logEntry: 'The cemetery is the first place to look for some clues about my past. Maybe I can find my ancestors here.',
            category: 'main',
            stages: [
                {
                    id: 0,
                    logEntry: 'The cemetery should be up north of here.',
                },
                {
                    id: 10,
                    logEntry: 'I have found the cemetery, now I should look for some clues among the graves.',
                    preconditions: [
                        {type: 'player-in-area', value: {x1: 0, y1: 0, x2: 100, y2: 100}}
                    ],
                },
                {
                    id: 50,
                    logEntry: 'I have found the grave of my granddads granddad, it had a little copper ring hidden in a corner. I took it',
                    preconditions: [
                        {type: 'player-inspect-object', value: 'player-ancestor-grave'}
                    ],
                    onComplete: [
                        {type: 'player-add-xp', value: 10},
                        {type: 'player-add-item', value: 'ancestor-ring'},
                    ]
                },
                {
                    id: 100,
                    logEntry: 'My ancestors ring has a name chiseled into it. It says: "Anita". I should look for info about this "Anita"',
                    preconditions: [
                        {type: 'player-inspect-object', value: 'ancestor-ring'}
                    ],
                    onComplete: [
                        {type: 'player-add-xp', value: 50},
                    ]
                }
            ],
            preconditions: [],
        },
        {
            id: 'quest.find.ancestor.info',
            name: 'Finding Anita',
            logEntry: 'Anita should be my only link with my ancestor. I should look for info about her.',
            category: 'main',
            stages: [
                {
                    id: 0,
                    logEntry: 'I should look for info about Anita',
                }
            ],
            preconditions: [
                {type: 'query-completed', value: 'quest.find.cemetery.clues'},
                {type: 'player-level-min', value: 10},
            ],
        }
    ];


    /**
     * Retrieves all available quests.
     *
     * @return {Quest[]} An array containing all quests.
     */
    all(): Quest[] {
        return this.quests;
    }


    /**
     * Retrieves a quest by its unique identifier.
     *
     * @param {string} id - The unique identifier of the quest to retrieve.
     * @return {Quest|undefined} The quest with the matching ID, or undefined if no quest is found.
     */
    get(id: string): Quest | undefined {
        return this.quests.find(q => q.id === id);
    }


}
