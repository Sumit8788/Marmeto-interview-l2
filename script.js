const api_url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

const men = document.querySelector('#men');
const women = document.querySelector('#women');
const kid = document.querySelector('#kid');

const getdata = async () => {
    const response = await fetch(api_url);
    const data = await response.json();
    await displayProducts(data.categories[0]);
    await men.addEventListener('click', () => {
        displayProducts(data.categories[0]);
    });
    await women.addEventListener('click', () => {
        displayProducts(data.categories[1]);
    });
    await kid.addEventListener('click', () => {
        displayProducts(data.categories[2]);
    })
}
getdata()
function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    // console.log(products.categories[0].category_products);

    products.category_products.forEach(product => {

        const card = document.createElement('div');
        card.classList.add('card');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');


        const img = document.createElement('img');
        img.src = product.image;
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);

        const para = document.createElement('p');
        para.textContent = product.badge_text;
        imgContainer.appendChild(para);

        const titleContainer = document.createElement('div');
        titleContainer.id = 'title_container';
        titleContainer.style.display = 'flex';

        const title = document.createElement('h3');
        title.textContent = product.title;
        titleContainer.appendChild(title);

        const span = document.createElement('span');
        span.textContent = '.';
        titleContainer.appendChild(span);

        const vendor = document.createElement('p');
        vendor.textContent = product.vendor;
        titleContainer.appendChild(vendor);

        card.appendChild(titleContainer);

        const priceContainer = document.createElement('div');
        priceContainer.style.display = 'flex';
        priceContainer.style.justifyContent = 'space-between';

        const discountedPrice = document.createElement('p');
        discountedPrice.id = 'discounted-price';
        discountedPrice.textContent = 'RS ' + product.price;
        priceContainer.appendChild(discountedPrice);

        const originalPrice = document.createElement('p');
        originalPrice.id = 'original-price';
        originalPrice.textContent = product.compare_at_price;
        priceContainer.appendChild(originalPrice);

        const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        const discountText = discountPercentage + '% off';

        const discount = document.createElement('p');
        discount.id = 'discount';
        discount.textContent = discountText;
        priceContainer.appendChild(discount);

        card.appendChild(priceContainer);

        const button = document.createElement('button');
        button.textContent = 'Add To Cart';
        card.appendChild(button);

        container.appendChild(card);
    });
}
