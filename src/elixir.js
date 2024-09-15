const contentCont = document.querySelector("#content");

export function createElixir() {
  const elixirDiv = document.createElement("div");
  elixirDiv.className = "elixir";
  contentCont.appendChild(elixirDiv);

  const card1 = document.createElement("div");
  card1.innerHTML = `<h1>Eldertree Vitality Elixir</h1>
          <p>
            Brewed from the sap of the ancient Eldertrees deep in the Whispering
            Woods, this potent elixir rejuvenates the body, restoring energy and
            health to even the most weary adventurers. Perfect for those needing
            a quick recharge after a long journey.
          </p>
          <div>
            <p>Restores stamina and boosts physical vitality.</p>
            <p class="price">20 Mystras</p>
          </div>`;
  elixirDiv.appendChild(card1);
  const card2 = document.createElement("div");
  card2.innerHTML = `<h1>Lunar Dream Draught</h1>
          <p>
            This shimmering silver elixir is infused with the essence of moonlight and enchanted nightshade. It brings on deep, peaceful sleep filled with vivid dreams, guiding the drinker to prophetic visions and otherworldly experiences. Best taken before bed, or in preparation for divination rituals.
          </p>
          <div>
            <p> Induces restful sleep and vivid dreams; aids in visions.</p>
            <p class="price">30 Mystras</p>
          </div>`;
  elixirDiv.appendChild(card2);

  const card3 = document.createElement("div");
  card3.innerHTML = `<h1>Phoenixfire Tonic</h1>
          <p>
            A fiery potion crafted from the feathers of a rare Phoenix and sun-kissed herbs. This elixir ignites inner strength and passion, making it a favorite for warriors and spellcasters alike. It enhances endurance and sparks a burning energy within, perfect for battles or magical duels.
          </p>
          <div>
            <p>Boosts endurance and enhances magical power.</p>
            <p class="price">50 Mystras</p>
          </div>`;
  elixirDiv.appendChild(card3);
}
