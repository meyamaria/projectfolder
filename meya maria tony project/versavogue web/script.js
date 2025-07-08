document.querySelector('.btn-primary').addEventListener('click', () => {
    window.scrollTo({
        top: document.querySelector('.product-section').offsetTop,
        behavior: 'smooth',
    });
});
