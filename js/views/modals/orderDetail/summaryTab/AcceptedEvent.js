import _ from 'underscore';
import moment from 'moment';
import loadTemplate from '../../../../utils/loadTemplate';
import BaseVw from '../../../baseVw';

export default class extends BaseVw {
  constructor(options = {}) {
    super(options);

    if (!this.model) {
      throw new Error('Please provide a model.');
    }

    this._state = {
      infoText: '',
      showActionButtons: false,
      avatarHashes: {},
      refundConfirmOn: false,
      refundOrderInProgress: false,
      fulfillInProgress: false,
      ...options.initialState || {},
    };
  }

  className() {
    return 'acceptedEvent';
  }

  getState() {
    return this._state;
  }

  setState(state, replace = false, renderOnChange = true) {
    let newState;

    if (replace) {
      this._state = {};
    } else {
      newState = _.extend({}, this._state, state);
    }

    if (renderOnChange && !_.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }

    return this;
  }

  render() {
    loadTemplate('modals/orderDetail/summaryTab/acceptedEvent.html', (t) => {
      this.$el.html(t({
        ...this._state,
        ...this.model.toJSON(),
        moment,
      }));
    });

    return this;
  }
}