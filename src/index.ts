document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByClassName(
    "form",
  ) as HTMLFormControlsCollection;
  const reactCheckBoxElementForm = document.getElementsByClassName(
    "sticker-checkbox",
  )[0] as HTMLInputElement;
  const vueCheckBoxElementForm = document.getElementsByClassName(
    "sticker-checkbox",
  )[1] as HTMLInputElement;
  const angularCheckBoxElementForm = document.getElementsByClassName(
    "sticker-checkbox",
  )[2] as HTMLInputElement;
  const decrementButton = document.getElementById(
    "decrement",
  ) as HTMLButtonElement;
  const incrementButton = document.getElementById(
    "increment",
  ) as HTMLButtonElement;
  const countInput = document.getElementsByClassName(
    "count-sticker",
  )[0] as HTMLInputElement;
  const observations = document.getElementById(
    "observation",
  ) as HTMLInputElement;
  const errorElement = document.getElementsByClassName("error-message");
  const sucessionSubmitMessage =
    document.getElementsByClassName("submition-message");

  let stickerAmount = 0;

  const handleDisableCountInputValue = () => {
    if (countInput.value === "0") {
      decrementButton.disabled = true;
    }
    if (countInput.value !== "0") {
      decrementButton.disabled = false;
      countInput.id = "";
    }
  };

  const handleDecrementButton = () => {
    handleDisableCountInputValue();
    decrementButton?.addEventListener("click", () => {
      stickerAmount--;
      countInput.value = String(stickerAmount);
      handleDisableCountInputValue();
    });
  };

  const handleIncrementButton = () => {
    handleDisableCountInputValue();
    incrementButton?.addEventListener("click", () => {
      stickerAmount++;
      countInput.value = String(stickerAmount);
      errorElement[1].id = "disabled";
      sucessionSubmitMessage[0].id = "disabled";
      handleDisableCountInputValue();
    });
  };

  handleDecrementButton();
  handleIncrementButton();

  const clearCheckboxError = () => {
    reactCheckBoxElementForm.id = "";
    vueCheckBoxElementForm.id = "";
    angularCheckBoxElementForm.id = "";
  };
  const insertErrorIdInCheckbox = () => {
    reactCheckBoxElementForm.id = "error";
    vueCheckBoxElementForm.id = "error";
    angularCheckBoxElementForm.id = "error";
  };

  const checkValidation = () => {
    reactCheckBoxElementForm.addEventListener("change", () => {
      if (reactCheckBoxElementForm.checked === true) {
        errorElement[0].id = "disabled";
        sucessionSubmitMessage[0].id = "disabled";
        clearCheckboxError();
      }
    });

    vueCheckBoxElementForm.addEventListener("change", () => {
      if (vueCheckBoxElementForm.checked === true) {
        errorElement[0].id = "disabled";
        sucessionSubmitMessage[0].id = "disabled";
        clearCheckboxError();
      }
    });

    angularCheckBoxElementForm.addEventListener("change", () => {
      if (angularCheckBoxElementForm.checked === true) {
        errorElement[0].id = "disabled";
        sucessionSubmitMessage[0].id = "disabled";
        clearCheckboxError();
      }
    });
  };

  const handleSubmit = () => {
    form[0].addEventListener("submit", (event) => {
      event.preventDefault();
      checkValidation();

      const clearForm = () => {
        countInput.value = "0";
        stickerAmount = 0;
        reactCheckBoxElementForm.checked = false;
        vueCheckBoxElementForm.checked = false;
        angularCheckBoxElementForm.checked = false;
        observations.value = "";
        handleDisableCountInputValue();
      };

      const isUnchecked =
        reactCheckBoxElementForm.checked !== true &&
        vueCheckBoxElementForm.checked !== true &&
        angularCheckBoxElementForm.checked !== true;

      const isEmptyValueSticker = countInput.value === "0";

      if (isUnchecked && isEmptyValueSticker) {
        errorElement[0].id = "";
        errorElement[1].id = "";
        countInput.id = "error";
        insertErrorIdInCheckbox();
        return;
      }

      if (isUnchecked) {
        errorElement[0].id = "";
        insertErrorIdInCheckbox();
        return;
      } else {
        errorElement[0].id = "disabled";
        countInput.id = "";
      }

      if (isEmptyValueSticker) {
        errorElement[1].id = "";
        countInput.id = "error";
        return;
      } else {
        errorElement[1].id = "disabled";
      }

      const formSubmitData = {
        status: 200,
        method: "POST",
        message: "Sucess",
        response: {
          date: new Date(),
          reactSticker: reactCheckBoxElementForm.checked,
          vueSticker: vueCheckBoxElementForm.checked,
          angularSticker: angularCheckBoxElementForm.checked,
          observations: observations.value,
          stickerAmount,
        },
      };
      sucessionSubmitMessage[0].id = "";
      console.log(formSubmitData);
      clearForm();
    });
  };
  handleSubmit();
});
