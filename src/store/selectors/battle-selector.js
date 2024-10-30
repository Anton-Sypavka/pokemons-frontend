export const selectedPokemonSelector = (state) => state.battle.selectedPokemon;
export const battleSelector = (state) => state.battle.battle;
export const battleLoadingSelector = (state) => state.battle.loading;
export const battleActionsSelector = (state) => state.battle.actions;
export const battleCurrentActionSelector = (state) => state.battle.currentAction;
export const battleHPSelector = (state) => state.battle.hp;
export const battleWinnerSelector = (state) => state.battle.winner;