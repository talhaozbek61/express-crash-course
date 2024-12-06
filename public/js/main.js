const output = document.querySelector("#output");
const form = document.querySelector("#addCharacterForm");

// Form Toggle
const getForm = () => {
  form.classList.toggle("hidden");
};

// Get and show characters
const showCharacters = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/characters");
    if (!res.ok) throw new Error("Failed to fetch character");

    const characters = await res.json();
    output.innerHTML = "";

    characters.map((character) => {
      output.classList.add("grid", "sm:grid-cols-2", "gap-4");

      const characterEl = document.createElement("div");
      characterEl.classList.add(
        "py-8",
        "px-6",
        "rounded-md",
        "bg-gray-200",
        "w-full"
      );
      characterEl.innerHTML =
        "<span class='text-blue-600'>@" +
        character.username +
        "</span>" +
        "<br>" +
        character.fullName;

      output.appendChild(characterEl);
    });
  } catch (error) {
    console.log("Error fetching characters: ", error);
  }
};

// Submit New Character
const addCharacter = async (e) => {
  e.preventDefault();

  // Form Data
  const formData = new FormData(form);
  const fullName = formData.get("name");
  const username = formData.get("username");

  try {
    const res = await fetch("http://localhost:8000/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, username }),
    });

    if (!res.ok) throw new Error("Failed to add character");

    // Run Show Characters Func
    showCharacters();

    // Reset Form Inputs
    form.reset();
  } catch (error) {
    // console.log(error);

    console.error("Error adding character");
  }
};

// Event listener
form.addEventListener("submit", addCharacter);
