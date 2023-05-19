/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WhatsappIcon, WhatsappShareButton } from "react-share";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const flavourInfo = [
    { flavour: "Vanilla", price: "700" },
    { flavour: "Butterscotch", price: "850" },
    { flavour: "Pineapple", price: "850" },
    { flavour: "Strawberry", price: "850" },
    { flavour: "Mango Alphonso", price: "850" },
    { flavour: "Black Forest", price: "920" },
    { flavour: "Chocochips", price: "920" },
    { flavour: "Milky Badam", price: "900" },
    { flavour: "Milky Butterscotch", price: "900" },
    { flavour: "Honey Almonds", price: "900" },
    { flavour: "Pineapple Gateau", price: "900" },
    { flavour: "Caramel Nuts", price: "900" },
    { flavour: "White Forest (Orange Flavor)", price: "950" },
    { flavour: "Lychee Strawberry", price: "950" },
    { flavour: "Blackcurrant", price: "880" },
    { flavour: "Vancho", price: "980" },
    { flavour: "Fruit and Nuts", price: "1030" },
    { flavour: "Fruits Overload", price: "1030" },
    { flavour: "Blueberry", price: "980" },
    { flavour: "White Truffle", price: "1050" },
    { flavour: "Choco Fantasy", price: "960" },
    { flavour: "Choco Vanilla", price: "960" },
    { flavour: "Brown Chocolate", price: "960" },
    { flavour: "Red Velvet", price: "1150" },
    { flavour: "German Blackforest", price: "980" },
    { flavour: "Chocolate Truffle", price: "1050" },
    { flavour: "Chocolate Symphony", price: "1150" },
    { flavour: "Oreo Mocha", price: "1200" },
    { flavour: "Chocolate Hazelnut", price: "1200" },
    { flavour: "Chocolate Five Star", price: "1200" },
    { flavour: "Choco KitKat", price: "1200" },
    { flavour: "Choco Crunch", price: "1200" },
    { flavour: "Chocolate Mousse", price: "1200" },
    { flavour: "Belgium Chocolate", price: "1400" },
    { flavour: "Italian Chocolate", price: "1300" },
    { flavour: "Rasmalai Cake", price: "1300" },
    { flavour: "Gulabjamun Cake", price: "1300" },
    { flavour: "Kaju Katli Cake", price: "1400" },
  ];

  const [calcuatedOutput, setCalcuatedOutput] = useState("");
  const [cakeQuantity, setCakeQuantity] = useState("");

  const onSubmit = (data) => {
    const flavourDetails = [];
    console.log(data);
    for (let item of flavourInfo) {
      const flavoutInputData = {};
      for (let key in data) {
        const flavourcategory = key.split("-");
        if (flavourcategory[1] == item.flavour) {
          flavoutInputData["flavour"] = item.flavour;
          flavoutInputData[flavourcategory[0]] = data[key];
        }
      }
      console.log(flavoutInputData);
      flavourDetails.push(flavoutInputData);
    }
    const selectedFlavours = flavourDetails.filter(
      (flavour) => flavour.isFlavourSelected
    );
    console.log(selectedFlavours, "selectedFlavours");
    calcuateCostPerFlavour(selectedFlavours, data);
  };

  const calcuateCostPerFlavour = (flavours, inputsForPriceCalc) => {
    const noveltyCost = Number(inputsForPriceCalc.novelty) || 0;
    const egglessPrice = inputsForPriceCalc.isEggless ? 60 : 0;
    const cakeQuantity = Number(inputsForPriceCalc.quantity) || 0;
    setCakeQuantity(cakeQuantity);

    console.log(`
      noveltyCost: ₹${noveltyCost}
      egglessPrice: ₹${egglessPrice}
      cakeQuantity: ${cakeQuantity} kg's
    `);

    const flavourWithCalcPrice = flavours.map((item) => {
      return `${item.flavour}: ₹ ${
        cakeQuantity * Number(item.costPerKg) +
        noveltyCost +
        cakeQuantity * egglessPrice
      }`;
    });

    console.log(flavourWithCalcPrice.toString().replace(/,/g, "\n"));
    setCalcuatedOutput(flavourWithCalcPrice.toString().replace(/,/g, "\n"));
  };

  const getFinalOutput = () => {
    if (document.getElementById("result-title")?.innerHTML !== null) {
      const calcPrice = document.getElementById("result-output")?.innerHTML;
      const info = document.getElementById("result-title")?.innerHTML;
      return { info, calcPrice };
    }
  };
  const copyToClipboard = async () => {
    const { info, calcPrice } = getFinalOutput();
    try {
      await navigator.clipboard.writeText(info + "\n" + calcPrice);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <div className="font-bold text-xl italic">
        Pastry Chef Icecream flavour quote:
      </div>
      <div className="w-full">
        <div className="flex justify-around items-center flex-wrap my-2">
          <div className="inline-flex items-center mr-2 min-w-[220px]">
            Flavor:
          </div>
          <div>Cost Per KG:</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {flavourInfo.map((info, index) => {
            return (
              <div
                className="flex justify-around items-center flex-wrap my-2"
                key={info.flavour + index}
              >
                <div className="inline-flex items-center mr-2 min-w-[220px]">
                  <input
                    key={info.flavour + index}
                    {...register(`isFlavourSelected-${info.flavour}`)}
                    id={`flavour-checkbox-${index}`}
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`flavour-checkbox-${index}`}
                    className="ml-2 text-sm font-bold text-gray-900"
                  >
                    {info.flavour}
                  </label>
                </div>
                <input
                  key={`costPerKg-${index}`}
                  className="w-[55px] text-end"
                  {...register(`costPerKg-${info.flavour}`)}
                  type={"number"}
                  value={info.price}
                  readOnly
                />
              </div>
            );
          })}
          <div className="flex justify-around items-center flex-wrap my-2">
            <input
              className="rounded-md w-[100px]"
              {...register("quantity")}
              type={"number"}
              step={0.5}
              placeholder={"Quantity"}
            />
            <input
              className="rounded-md w-[100px]"
              {...register("novelty")}
              placeholder={"Novelty"}
              type={"number"}
            />
            <div className="flex items-center">
              <span className="mx-2">Eggless:</span>
              <label className="relative inline-flex my-2 items-center cursor-pointer">
                <input
                  {...register("isEggless")}
                  type={"checkbox"}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 
                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
          </div>
          <input
            className="w-full bg-emerald-500 py-2 mt-2 rounded-xl"
            type="submit"
          />
        </form>
        {calcuatedOutput.length > 0 ? (
          <div className="w-full p-3 bg-white rounded-xl my-6">
            <div className="share-wrapper">
              <WhatsappShareButton
                title={`Cost of ${cakeQuantity} ${cakeQuantity > 1 ? "kg's" : "kg"} cake for the selected model: \n`}
                url={calcuatedOutput}
              >
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
              <svg
                className="clipboard-img"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={copyToClipboard}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                ></path>
              </svg>
            </div>
            <div className="result-data">
              <div id="result-title">
                Cost of {cakeQuantity} {cakeQuantity > 1 ? "kg's" : "kg"} cake
                for the selected model:
              </div>
              <div id="result-output">{calcuatedOutput}</div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
