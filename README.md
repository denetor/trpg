## NPCs AI
NPCs AI is modeled, for now, with a finite state automata.


### Available states
- idle: standing, waiting for someghing to happen
- fight_player: fighting the player
- chase_player: chasing the player until at fighting range
- flee_player: fleeing from the player
- talk: talking to the player
- wandering: wandering without any goal
- patrolling: patrolling between two points


Some NPCs can only be in a subset of all these states.

Each NPC has a structure containing:
- its available states
- its current state
- a list of variables and flags (eg. if the NPC has already spoken about some argument, or if the player has already done some peculiar action)

### States transition
Each state can transition to a subset of available states (eg. flee_player will never transition to idle or talk).
### Nice to have:
- The transition between states may have a priority value, so in case of multiple possibilities, the NPC will choose the one with the highest priority.
- This priority can be modified by some NPC values, such as aggressivity (a deer always tries to flee), etc..

