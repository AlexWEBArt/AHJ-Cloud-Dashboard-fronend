export default class SubscriptionApi {
  constructor(apiUrl, instanceFactory, containerInstances) {
    this.apiUrl = apiUrl;
    this.instanceFactory = instanceFactory;
    this.containerInstances = containerInstances;
  }

  async renderInstances() {
    this.generationLoading();
    const request = fetch(`https://${this.apiUrl}instances/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    const json = await result.json();

    json.data.forEach((item) => {
      this.instanceFactory.renderInstance(item);
    });

    this.removeLoading();
  }

  async addInstance() {
    fetch(`https://${this.apiUrl}addInstance/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async removeInstance(id) {
    this.generationLoading();

    const query = `removeInstance/?id=${encodeURIComponent(id)}`;

    const request = fetch(`https://${this.apiUrl + query}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка!');
    }

    this.removeLoading();
  }

  generationLoading() {
    if (!document.querySelector('.loadingio-spinner-spinner-ugc4sg2wum')) {
      const imageContainer = document.createElement('DIV');
      const animation = document.createElement('DIV');

      imageContainer.classList.add('loadingio-spinner-spinner-ugc4sg2wum');
      animation.classList.add('ldio-7nr8cpu8w2k');

      this.containerInstances.appendChild(imageContainer);
      imageContainer.append(animation);
      for (let i = 12; i !== 0; i -= 1) {
        animation.append(document.createElement('DIV'));
      }
    }
  }

  removeLoading() {
    if (document.querySelector('.loadingio-spinner-spinner-ugc4sg2wum')) {
      this.containerInstances.querySelector('.loadingio-spinner-spinner-ugc4sg2wum').remove();
    }
  }
}
