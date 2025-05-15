/**
 * This is the repository of all quests available in the game world.
 */
export class QuestsRepository {
    private quests = [
        {
            id: 'quest.find.cemetery.clues',
            name: 'Finding my ancestors',
            description: 'The cemetery is the first place to look for some clues about my past. Maybe I can find my ancestors here.',
            category: 'main',
            faction: null,
            stages: [
                {
                    id: 0,
                    description: 'The cemetery should be up north of here.',
                },
                {
                    id: 10,
                    description: 'I have found the cemetery, now I should look for some clues among the graves.',
                    conditions: [
                        {type: 'player-in-area', value: {x1: 0, y1: 0, x2: 100, y2: 100}}
                    ],
                },
                {
                    id: 50,
                    description: 'I have found the grave of my granddads granddad, it had a little copper ring hidden in a corner. I took it',
                    conditions: [
                        {type: 'player-inspect-object', value: 'player-ancestor-grave'}
                    ],
                    actions: [
                        {type: 'player-add-xp', value: 10},
                        {type: 'player-add-item', value: 'ancestor-ring'},
                    ]
                },
                {
                    id: 100,
                    description: 'My ancestors ring has a name chiseled into it. It says: "Anita". I should look for info about this "Anita"',
                    conditions: [
                        {type: 'player-inspect-object', value: 'ancestor-ring'}
                    ],
                    actions: [
                        {type: 'player-add-xp', value: 50},
                        {type: 'start-quest', value: 'quest.find.ancestor.info'},
                    ]
                }
            ],
        },
        {
            id: 'quest.find.ancestor.info',
            name: 'Finding Anita',
            description: 'Anita should be my only link with my ancestor. I should look for info about her.',
            category: 'main',
            faction: null,
            stages: [
                {
                    id: 0,
                    description: 'I should look for info about Anita',
                }
            ]
        }
    ];
}
