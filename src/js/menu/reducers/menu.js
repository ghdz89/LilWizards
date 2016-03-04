/**
 * Created by Justin on 2016-02-29.
 */
import _ from 'lodash';
import getLayer from '../get_layer';

const initialState = [createMenu('top')];

export default function menuReducer(state = initialState, action) {
  state = _.cloneDeep(state);
  const current = _.last(state);
  const menu = getLayer(current.layer);
  const { columns, commands } = menu;
  const numCommands = commands.length;

  action.parameter = action.parameter || {};
  const { direction, location, player } = action.parameter;

  switch (action.type) {
    case 'SELECT': {
      current.index = (current.index + direction + numCommands) % numCommands;

      console.log('selected:', commands[current.index].name);

      return state;
    }

    case 'SELECT_COLUMN': {
      const mathFn = Math[direction < 0 ? 'ceil' : 'floor'];
      const columnAdjust = mathFn(direction *  numCommands / (columns || 1));
      current.index = (current.index + columnAdjust + numCommands) % numCommands;

      console.log('selected:', commands[current.index].name);

      return state;
    }

    case 'GO_TO': {
      state.push({ layer: location, index: 0 });

      console.log('went to:', location);

      return state;
    }

    case 'ADD_CHILD': {
      current.subMenus[player.id] = [createMenu(menu.subMenus)];

      console.log('add child:', player.id);

      return state;
    }

    case 'BACK': {
      if (state.length > 1) state.pop();

      console.log('went back');

      return state;
    }

    default: {
      return state;
    }
  }
};

function createMenu(location) {
  return {
    layer: location,
    index: 0,
    subMenus: {},
  };
}
