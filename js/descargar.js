function download1() {
    axios({
        url: 'formatos/REPORTE DE PROMEDIO DE USO GENERAL MOD-0.docx',
        method: 'GET',
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'feria de proyectos.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
}
