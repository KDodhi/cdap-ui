/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ScheduleRuntimeArgs from 'components/PipelineTriggers/ScheduleRuntimeArgs';
import IconSVG from 'components/shared/IconSVG';
import T from 'i18n-react';
import CardActionFeedback, { CARD_ACTION_TYPES } from 'components/shared/CardActionFeedback';
import If from 'components/shared/If';

require('./PayloadConfigModal.scss');

const PREFIX = 'features.PipelineTriggers.ScheduleRuntimeArgs.PayloadConfigModal';

export default class PayloadConfigModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    triggeringPipelineInfo: PropTypes.object,
    triggeredPipelineInfo: PropTypes.string,
    onClose: PropTypes.func,
    onEnableSchedule: PropTypes.func,
    disabled: PropTypes.bool,
    scheduleInfo: PropTypes.object,
    configureError: PropTypes.string,
    onToggle: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  toggle = () => {
    const newState = !this.state.isOpen;
    this.setState({
      isOpen: newState,
    });
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(newState);
    }
    if (!this.state.isOpen && this.props.onClose) {
      this.props.onClose();
    }
  };

  renderModal = () => {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <Modal
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        modalClassName="payload-config-modal"
        size="lg"
        zIndex="1061"
        backdrop="static"
      >
        <ModalHeader className="clearfix">
          <span className="pull-left">{T.translate(`${PREFIX}.title`)}</span>
          <div className="btn-group pull-right">
            <a className="btn" onClick={this.toggle}>
              <IconSVG name="icon-close" className="fa" />
            </a>
          </div>
        </ModalHeader>
        <ModalBody>
          <ScheduleRuntimeArgs
            triggeringPipelineInfo={this.props.triggeringPipelineInfo}
            triggeredPipelineInfo={this.props.triggeredPipelineInfo}
            onEnableSchedule={this.props.onEnableSchedule}
            disabled={this.props.disabled}
            scheduleInfo={this.props.scheduleInfo}
          />
        </ModalBody>
        <If condition={this.props.configureError}>
          <CardActionFeedback
            type={CARD_ACTION_TYPES.DANGER}
            message="Failed to configure and enable trigger"
            extendedMessage={this.props.configureError}
          />
        </If>
      </Modal>
    );
  };

  render() {
    let label = this.props.disabled
      ? T.translate(`${PREFIX}.configPayloadBtnDisabled`)
      : T.translate(`${PREFIX}.configPayloadBtn`);

    return (
      <div className="payload-config-modal">
        <button
          className="btn btn-link"
          onClick={this.toggle}
          data-cy={this.props.disabled ? 'view-payload-btn' : 'trigger-config-btn'}
        >
          {label}
        </button>
        {this.renderModal()}
      </div>
    );
  }
}
