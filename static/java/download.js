// Function to download the table as JPG or PNG
function downloadImage(type) {
    html2canvas(document.querySelector('#myTable'), {
        onrendered: function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL(`image/${type}`);
            link.download = `table.${type}`;
            link.click();
        }
    });
}

// Function to download the table as Excel
function downloadExcel() {
    var table = document.getElementById("myTable");
    var workbook = XLSX.utils.table_to_book(table, {sheet: "Sheet 1"});
    XLSX.writeFile(workbook, 'table.xlsx');
}

// Add event listeners to buttons
document.getElementById('downloadJPG').addEventListener('click', function() {
    downloadImage('jpeg');
});

document.getElementById('downloadPNG').addEventListener('click', function() {
    downloadImage('png');
});

document.getElementById('downloadExcel').addEventListener('click', function() {
    downloadExcel();
});
