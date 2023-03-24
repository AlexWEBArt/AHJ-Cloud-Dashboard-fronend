export default class CreateInstance {
  constructor(url, container) {
    this.URL = url;
    this.container = container;
  }

  conectingToWS(id) {
    const ws = new WebSocket(`wss://${this.URL}/ws`);

    const activeInstance = Array.from(document.querySelectorAll('.instance-id'))
      .find((item) => item.textContent === id)
      .closest('.instance-container');
    const instanceStatus = activeInstance.querySelector('.instance-status');
    const instancePlayback = activeInstance.querySelector('.action-playback');

    instancePlayback.addEventListener('click', () => {
      const instance = {};

      instance.id = id;

      if (instanceStatus.textContent === 'Stopped') {
        instance.status = 'running';
      } else {
        instance.status = 'stopped';
      }

      ws.send(JSON.stringify(instance));
    });

    ws.addEventListener('open', (e) => {
      console.log(e);

      console.log('ws open');
    });

    ws.addEventListener('close', (e) => {
      console.log(e);

      console.log('ws close');
    });

    ws.addEventListener('error', (e) => {
      console.log(e);

      console.log('ws error');
    });

    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      console.log(data[0]);

      if (!data[0].id) return;

      data.forEach((instance) => {
        const index = instance.id;
        const { state } = instance;

        CreateInstance.updateInstance(index, state);
      });

      console.log('ws message');
    });
  }

  static updateInstance(id, status) {
    const instances = Array.from(document.querySelectorAll('.instance-id'));

    const activeInstance = instances.filter((item) => item.textContent === id)[0];

    if (status === 'running') {
      activeInstance.closest('.instance-column').querySelector('.instance-status').textContent = 'Running';
      activeInstance.closest('.instance-column').querySelector('.instance-status-image').textContent = '\u{1F7E2}';
      activeInstance.closest('.instance-column').querySelector('.action-playback').textContent = '\u{23F8}';
    } else {
      activeInstance.closest('.instance-column').querySelector('.instance-status').textContent = 'Stopped';
      activeInstance.closest('.instance-column').querySelector('.instance-status-image').textContent = '\u{26AB}';
      activeInstance.closest('.instance-column').querySelector('.action-playback').textContent = '\u{25B6}';
    }
  }

  renderInstance(item) {
    const instanceContainer = document.createElement('DIV');
    const instanceColumn = document.createElement('UL');
    const instanceLiId = document.createElement('LI');
    const instanceId = document.createElement('P');
    const instanceLiStatus = document.createElement('LI');
    const instanceLiStatusRow = document.createElement('UL');
    const instanceLiStatusTitle = document.createElement('LI');
    const instanceStatusTitle = document.createElement('P');
    const instanceLiStatusImage = document.createElement('LI');
    const instanceStatusImage = document.createElement('P');
    const instanceLiStatusText = document.createElement('LI');
    const instanceStatusText = document.createElement('P');
    const instanceLiActions = document.createElement('LI');
    const instanceLiActionsRow = document.createElement('UL');
    const instanceLiActionsTitle = document.createElement('LI');
    const instanceActionsTitle = document.createElement('P');
    const instanceLiActionsPlayback = document.createElement('LI');
    const instanceActionsPlayback = document.createElement('P');
    const instanceLiActionsDelete = document.createElement('LI');
    const instanceActionsDelete = document.createElement('P');

    instanceContainer.classList.add('instance-container');
    instanceColumn.classList.add('instance-column');
    instanceId.classList.add('instance-id');
    instanceLiStatusRow.classList.add('instance-row');
    instanceLiActionsRow.classList.add('instance-row');
    instanceLiStatusTitle.classList.add('title-width');
    instanceStatusImage.classList.add('instance-status-image');
    instanceStatusText.classList.add('instance-status');
    instanceLiActionsTitle.classList.add('title-width');
    instanceActionsPlayback.classList.add('action-playback');
    instanceActionsDelete.classList.add('action-delete');

    instanceId.textContent = item.id;
    instanceStatusTitle.textContent = 'Status:';
    instanceActionsTitle.textContent = 'Actions:';

    if (item.state === 'running') {
      instanceStatusImage.textContent = '\u{1F7E2}';
      instanceStatusText.textContent = 'Running';
      instanceActionsPlayback.textContent = '\u{23F8}';
    } else {
      instanceStatusImage.textContent = '\u{26AB}';
      instanceStatusText.textContent = 'Stopped';
      instanceActionsPlayback.textContent = '\u{25B6}';
    }

    instanceActionsDelete.textContent = '\u{2716}';

    instanceActionsDelete.addEventListener('click', () => {
      window.api.removeInstance(item.id);
    });

    this.container.appendChild(instanceContainer);
    instanceContainer.append(instanceColumn);
    instanceColumn.append(instanceLiId);
    instanceLiId.append(instanceId);
    instanceColumn.append(instanceLiStatus);
    instanceLiStatus.append(instanceLiStatusRow);
    instanceLiStatusRow.append(instanceLiStatusTitle);
    instanceLiStatusTitle.append(instanceStatusTitle);
    instanceLiStatusRow.append(instanceLiStatusImage);
    instanceLiStatusImage.append(instanceStatusImage);
    instanceLiStatusRow.append(instanceLiStatusText);
    instanceLiStatusText.append(instanceStatusText);
    instanceColumn.append(instanceLiActions);
    instanceLiActions.append(instanceLiActionsRow);
    instanceLiActionsRow.append(instanceLiActionsTitle);
    instanceLiActionsTitle.append(instanceActionsTitle);
    instanceLiActionsRow.append(instanceLiActionsPlayback);
    instanceLiActionsPlayback.append(instanceActionsPlayback);
    instanceLiActionsRow.append(instanceLiActionsDelete);
    instanceLiActionsDelete.append(instanceActionsDelete);

    window.api.removeLoading();
    this.conectingToWS(item.id);
  }
}
