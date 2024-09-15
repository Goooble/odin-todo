const contentCont = document.querySelector("#content");

export function createContact() {
  const contactDiv = document.createElement("div");
  contactDiv.className = "contact";
  contactDiv.innerHTML = `<h1><span>Aurelia Starwhisper</span> – Master Alchemist</h1>
        <p>
          Aurelia Starwhisper, born under a rare celestial alignment, has
          mastered the ancient art of alchemy through years of mystical study
          and daring adventures across the realms. Known for brewing potions
          with stardust, dragonfire, and forgotten spells, her elixirs are
          legendary—imbued with raw magic and whispered secrets of the cosmos.
          At <span>Elixir Emporium</span>, Aurelia's unparalleled craft brings
          wonder to all who seek her enchanted brews.
        </p>
        <h1>To Reach <span>Aurelia Starwhispe</span>r</h1>
        <p>
          If you seek the wisdom of our master alchemist, simply whisper your
          request into a silver moonbeam at twilight, or write it upon enchanted
          parchment dusted with stardust. Tie it to the leg of a raven born
          under a crescent moon, and it will find its way to her. For less
          arcane inquiries, you may also use the enchanted scroll below to send
          a message directly to her workshop.
        </p>`
  contentCont.appendChild(contactDiv);

  
}
