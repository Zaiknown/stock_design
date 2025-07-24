// static/js/live_search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('productTableBody');
    const originalRowsHTML = tableBody.innerHTML;

    function debounce(func, delay = 300) { /* ... (função debounce continua igual) ... */ }

    const performSearch = (query) => {
        if (query === '') {
            tableBody.innerHTML = originalRowsHTML;
            return;
        }

        fetch(`/api/search-products/?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';

                if (data.products.length > 0) {
                    data.products.forEach(product => {
                        const detailUrl = `/product/${product.id}/`;
                        const updateUrl = `/edit/${product.id}/`;
                        const deleteUrl = `/delete/${product.id}/`;

                        // Lógica para criar a tag da imagem ou o placeholder
                        let imageHtml = '';
                        if (product.image_url) {
                            imageHtml = `<img src="${product.image_url}" alt="${product.name}" class="product-list-image">`;
                        } else {
                            imageHtml = `<span class="no-image-placeholder"><i class="fas fa-camera"></i></span>`;
                        }

                        const row = `
                            <tr>
                                <td>${imageHtml}</td>
                                <td><a href="${detailUrl}">${product.name}</a></td>
                                <td>${product.sku}</td>
                                <td style="text-align: center;">${product.quantity}</td>
                                <td style="text-align: right;">
                                    <a href="${updateUrl}" class="btn" style="background-color: #007bff;" title="Editar"><i class="fas fa-edit"></i></a>
                                    <a href="${deleteUrl}" class="btn" title="Deletar"><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                        `;
                        tableBody.innerHTML += row;
                    });
                } else {
                    const row = `
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 2rem;">Nenhum produto encontrado.</td>
                        </tr>
                    `;
                    tableBody.innerHTML = row;
                }
            })
            .catch(error => console.error('Erro na busca:', error));
    };

    searchInput.addEventListener('input', debounce((e) => {
        performSearch(e.target.value.trim());
    }));
});