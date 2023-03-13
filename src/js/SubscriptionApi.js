export default class SubscriptionApi {
  constructor(apiUrl, instanceFactory) {
    this.apiUrl = apiUrl;
    this.instanceFactory = instanceFactory;
  }

  async renderInstances() {
    const request = fetch(`http://${this.apiUrl}instances/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify(user),
    });

    const result = await request;
    console.log(result);
    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    const json = await result.json();

    console.log(json.data);

    json.data.forEach((item) => {
      this.instanceFactory.renderInstance(item);
    });

    // const { status } = json;

    // console.log(status);

    // return status
  }

  async addInstance() {
    const request = fetch(`http://${this.apiUrl}addInstance/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify(user),
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    const json = await result.json();

    json.forEach((item) => {
      this.instanceFactory.renderInstance(item);
    });

    // const { status } = json;

    // console.log(status);

    // return status
  }

  // async add(user) {
  //   const request = fetch(`${this.apiUrl}subscriptions/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   console.log(user);
  //   const result = await request;

  //   if (!result.ok) {
  //     console.error('Ошибка');

  //     return;
  //   }

  //   const json = await result.json();
  //   const { status } = json;

  //   console.log(status);

  //   return status
  // }

  async removeInstance(id) {
    const query = `removeInstance/?id=${encodeURIComponent(id)}`;

    const request = fetch(`http://${this.apiUrl + query}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка!');

      return;
    }

    const json = await result.json();
    const { status } = json;

    if (status) {
      const instances = Array.from(document.querySelectorAll('.instance-id'));

      const activeInstance = instances.filter((item) => item.textContent === id)[0];

      activeInstance.closest('.instance-container').remove();
    }

    console.log(status);
  }

  // async activeUser() {
  //   const request = fetch(`${this.apiUrl}index/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const result = await request;

  //   if (!result.ok) {
  //     console.error('Ошибка');

  //     return;
  //   }

  //   const json = await result.json();

  //   return json;
  // }
}
