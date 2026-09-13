const lengthConversions = {
    Meters: 1,
    Feet: 0.3048,
    Yards: 0.9144,
    Kilometers: 1000,
    Miles: 1609.344
};

// Volume
const volumeConversions = {
    Liters: 1,
    Gallons: 3.78541,
    Milliliters: 0.001
};

// Mass
const massConversions = {
    Kilograms: 1,
    Pounds: 0.453592,
    Grams: 0.001
};

// Time
const timeConversions = {
    Seconds: 1,
    Minutes: 60,
    Hours: 3600,
    Days: 86400
};

function convertUsingFactors(value, fromUnit, toUnit, conversions) {
    const baseValue = value * conversions[fromUnit];
    return baseValue / conversions[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    let result;

    // Convert input unit to Celsius first as a base
    let tempInCelsius;

    if (fromUnit === "Celsius") {
        tempInCelsius = value;
    } else if (fromUnit === "Fahrenheit") {
        tempInCelsius = (value - 32) * (5 / 9);
    } else if (fromUnit === "Kelvin") {
        tempInCelsius = value - 273.15;
    }

    // Convert from Celsius to target unit
    if (toUnit === "Celsius") {
        result = tempInCelsius;
    } else if (toUnit === "Fahrenheit") {
        result = (tempInCelsius * 9 / 5) + 32;
    } else if (toUnit === "Kelvin") {
        result = tempInCelsius + 273.15;
    }

    return result;
}

function formatNumber(number) {
    return Number(number.toFixed(6));
}

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const openButton = card.querySelector(".open-btn");
        const closeButton = card.querySelector(".close-btn");
        const convertButton = card.querySelector(".convert-btn");

        if (openButton) {
            openButton.addEventListener("click", (event) => {
                event.stopPropagation();
                card.classList.add("flipped");
            });
        }

        if (closeButton) {
            closeButton.addEventListener("click", (event) => {
                event.stopPropagation();
                card.classList.remove("flipped");
            });
        }

        if (convertButton) {
            convertButton.addEventListener("click", (event) => {
                event.stopPropagation();

                const valueInput = card.querySelector(".value-input");
                const fromSelect = card.querySelector(".from-unit");
                const toSelect = card.querySelector(".to-unit");
                const resultElement = card.querySelector(".result");

                if (!valueInput.value.trim()) {
                    resultElement.textContent = "Please enter a value.";
                    return;
                }

                const value = Number(valueInput.value);
                const fromUnit = fromSelect.value;
                const toUnit = toSelect.value;
                const category = card.querySelector("h2").textContent;
                let result;

                if (category === "Length") {
                    result = convertUsingFactors(value, fromUnit, toUnit, lengthConversions);
                } else if (category === "Volume") {
                    result = convertUsingFactors(value, fromUnit, toUnit, volumeConversions);
                } else if (category === "Mass") {
                    result = convertUsingFactors(value, fromUnit, toUnit, massConversions);
                } else if (category === "Time") {
                    result = convertUsingFactors(value, fromUnit, toUnit, timeConversions);
                } else if (category === "Temperature") {
                    result = convertTemperature(value, fromUnit, toUnit);
                }

                resultElement.textContent = `${formatNumber(result)} ${toUnit}`;
            });
        }
    });
});