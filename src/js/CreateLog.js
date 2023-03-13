export default class CreateLog {
  constructor(container) {
    this.container = container;
  }

  connectingToSSE(url) {
    const eventSource = new EventSource(`http://${url}sse`);

    eventSource.addEventListener('open', (e) => {
      console.log(e);

      console.log('sse open');
    });

    eventSource.addEventListener('error', (e) => {
      console.log(e);

      console.log('sse error');
    });

    eventSource.addEventListener('message', (e) => {
      console.log(e);

      const log = JSON.parse(e.data);

      this.renderLog(log);

      console.log('sse message');
    });
  }

  renderLog(body) {
    const boxLog = document.createElement('DIV');
    const timeStamp = document.createElement('SPAN');
    const information = document.createElement('DIV');
    const mark = document.createElement('P');
    const message = document.createElement('P');

    boxLog.classList.add('log-container');
    timeStamp.classList.add('log-timestamp');
    information.classList.add('log-information-box');
    mark.classList.add('log-mark');
    message.classList.add('log-message');

    timeStamp.textContent = body.timeStamp;
    mark.textContent = `Server: ${body.id}`;
    message.textContent = `INFO: ${body.info}`;

    this.container.appendChild(boxLog);
    boxLog.append(timeStamp);
    boxLog.append(information);
    information.append(mark);
    information.append(message);
  }
}
