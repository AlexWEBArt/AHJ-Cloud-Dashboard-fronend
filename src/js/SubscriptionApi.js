export default class SubscriptionApi {
  constructor(apiUrl, instanceFactory) {
    this.apiUrl = apiUrl;
    this.instanceFactory = instanceFactory;
  }

  async renderInstances() {
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
  }

  async addInstance() {
    const request = fetch(`https://${this.apiUrl}addInstance/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');
    }
  }

  async removeInstance(id) {
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
  }
}
