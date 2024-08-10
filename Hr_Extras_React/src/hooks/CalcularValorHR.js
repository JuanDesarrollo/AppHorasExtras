
export const CalcularValorHR = (hed, hen, hedd, hedn, rdd, rdn, rn, salario, valorHora, horasPorcentaje) => {
    // horasPorcentaje[0].porcentaje
    const Vhed = parseFloat(valorHora) * (parseFloat(hed) * (parseFloat(horasPorcentaje[1].porcentaje) / 100));
    const Vhen = parseFloat(valorHora) * (parseFloat(hen) * (parseFloat(horasPorcentaje[2].porcentaje) / 100));
    const Vhedd = parseFloat(valorHora) * (parseFloat(hedd) * (parseFloat(horasPorcentaje[3].porcentaje) / 100));
    const Vhedn = parseFloat(valorHora) * (parseFloat(hedn) * (parseFloat(horasPorcentaje[4].porcentaje) / 100));
    const Vrdd = parseFloat(valorHora) * (parseFloat(rdd) * (parseFloat(horasPorcentaje[5].porcentaje) / 100));
    const Vrdn = parseFloat(valorHora) * (parseFloat(rdn) * (parseFloat(horasPorcentaje[6].porcentaje) / 100));
    const Vrn = parseFloat(valorHora) * (parseFloat(rn) * (parseFloat(horasPorcentaje[0].porcentaje) / 100));

    return "$"+(Vhed + Vhen + Vhedd + Vhedn + Vrdd + Vrdn + Vrn).toFixed(3);

}
