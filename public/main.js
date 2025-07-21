const form = document.getElementById('lead-form');
const message = document.getElementById('message');

if (form && message) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const input = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      postcode: formData.get('postcode'),
      serviceIds: formData.getAll('serviceIds')
    };

    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation RegisterLead($input: RegisterInput!) {
              register(input: $input) {
                id
                name
                email
              }
            }
          `,
          variables: { input }
        })
      });

      const result = await response.json();

      if (!response.ok || result.errors) {
        const errorMsg = result.errors?.[0]?.message || 'Failed to create lead';
        throw new Error(errorMsg);
      }

      message.textContent = `Lead created with ID: ${result.data.register.id}`;
      message.classList.remove('text-red-600');
      message.classList.add('text-green-600');
      form.reset();
    } catch (err) {
      console.error(err);
      message.textContent = `${err.message || 'Error creating lead'}`;
      message.classList.remove('text-green-600');
      message.classList.add('text-red-600');
    }
  });
}
