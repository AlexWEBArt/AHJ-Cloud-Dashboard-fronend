export default class CreateLog {
  constructor(container, instanceFactory) {
    this.container = container;
    this.instanceFactory = instanceFactory;
  }

  connectingToSSE(url) {
    const eventSource = new EventSource(`https://${url}sse`);

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

      if (log.info === 'Created') {
        const item = {
          id: log.id,
          state: 'stopped',
        };
        this.instanceFactory.renderInstance(item);
      }

      if (log.info === 'Removed') {
        const idList = Array.from(document.querySelectorAll('.instance-id'));

        const activeInstance = idList.filter((item) => item.textContent === log.id)[0];

        activeInstance.closest('.instance-container').remove();
      }

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
