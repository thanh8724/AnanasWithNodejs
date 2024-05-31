function strToNumber(formattedString) {
    return parseFloat(formattedString.replace(/\./g, ""));
}
function formatMoney(numberFormat) {
    return new Intl.NumberFormat("vi-VN", {
        style: "decimal",
    }).format(numberFormat);
}
export {};
//# sourceMappingURL=format.js.map