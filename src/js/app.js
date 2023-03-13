import background from '../img/cell.jpg';
import CreateInstance from './CreateInstance';
import CreateLog from './CreateLog';
import SubscriptionApi from './SubscriptionApi';

document.querySelector('body').style.backgroundImage = `url(${background})`;

const URL = 'cloud-dashboard-backend.onrender.com/';

const containerInstances = document.querySelector('.instances-box');
const containerLogs = document.querySelector('.logs-box');

const instanceFactory = new CreateInstance(URL, containerInstances);
const logsFactory = new CreateLog(containerLogs);

window.api = new SubscriptionApi(URL, instanceFactory);
logsFactory.connectingToSSE(URL);

const addInstance = document.querySelector('.new-instance');

window.api.renderInstances();

addInstance.addEventListener('click', () => {
  window.api.addInstance();
});
