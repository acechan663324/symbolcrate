export interface SymbolItem {
  symbol: string;
  name: string;
}

export interface SymbolCategory {
  name: string;
  description: string;
  symbols: SymbolItem[];
}

export const SEARCHABLE_CATEGORIES: SymbolCategory[] = [
  {
    name: 'Popular',
    description: "This collection features the most frequently used symbols across the web. From classic hearts and stars to essential checkmarks and currency signs, these are the go-to characters for adding quick visual emphasis to your messages, social media posts, and documents. They are universally recognized and render correctly on almost any device, making them a reliable choice for everyday communication and design.",
    symbols: [
        { symbol: '♡', name: 'White Heart Suit' },
        { symbol: '❤', name: 'Red Heart' },
        { symbol: '⭐', name: 'Glowing Star' },
        { symbol: '★', name: 'Black Star' },
        { symbol: '✓', name: 'Check Mark' },
        { symbol: '✔', name: 'Heavy Check Mark' },
        { symbol: '→', name: 'Right Arrow' },
        { symbol: '←', name: 'Left Arrow' },
        { symbol: '↑', name: 'Up Arrow' },
        { symbol: '↓', name: 'Down Arrow' },
        { symbol: '©', name: 'Copyright' },
        { symbol: '®', name: 'Registered Trademark' },
        { symbol: '™', name: 'Trademark' },
        { symbol: '€', name: 'Euro' },
        { symbol: '£', name: 'Pound' },
        { symbol: '¥', name: 'Yen' },
        { symbol: '§', name: 'Section Sign' },
        { symbol: '°', name: 'Degree Sign' },
        { symbol: '•', name: 'Bullet' },
        { symbol: '…', name: 'Ellipsis' },
        { symbol: '’', name: 'Right Single Quotation Mark' },
        { symbol: '“', name: 'Left Double Quotation Mark' },
        { symbol: '”', name: 'Right Double Quotation Mark' },
    ],
  },
  {
    name: 'Stars',
    description: "Illuminate your text with our celestial collection of star symbols. This category includes everything from simple outlines and solid five-pointed stars to intricate starbursts, sparkling asterisks, and dazzling decorative marks. Stars are incredibly versatile, often used to represent quality (like in ratings), fame, magic, or festive occasions. They can add a touch of sparkle and wonder to your nicknames, social media bios, or design projects.",
    symbols: [
        { symbol: '★', name: 'Black Star' }, { symbol: '☆', name: 'White Star' }, { symbol: '✪', name: 'Circled White Star' }, { symbol: '✫', name: 'Open Center Black Star' },
        { symbol: '✬', name: 'Black Centre White Star' }, { symbol: '✭', name: 'Outlined Black Star' }, { symbol: '✮', name: 'Heavy Outlined Black Star' }, { symbol: '✯', name: 'Pinwheel Star' },
        { symbol: '✰', name: 'Shadowed White Star' }, { symbol: '✡', name: 'Star of David' }, { symbol: '✩', name: 'Stress Outlined White Star' }, { symbol: '✶', name: 'Six Pointed Black Star' },
        { symbol: '✷', name: 'Eight Pointed Black Star' }, { symbol: '✸', name: 'Eight Pointed Pinwheel Star' }, { symbol: '✹', name: 'Twelve Pointed Black Star' }, { symbol: '✺', name: 'Sixteen Pointed Asterisk' },
        { symbol: '✵', name: 'Eight Pointed Rectilinear Black Star' }, { symbol: '✴', name: 'Eight Pointed Black Star' }, { symbol: '❄', name: 'Snowflake' }, { symbol: '❉', name: 'Balloon Spoked Asterisk' },
        { symbol: '❋', name: 'Heavy Eight Teardrop-Spoked Propeller Asterisk' }, { symbol: '❊', name: 'Heavy Sparkle' }, { symbol: '✨', name: 'Sparkles' }, { symbol: '✧', name: 'White Four Pointed Star' },
        { symbol: '✦', name: 'Black Four Pointed Star' }
    ],
  },
  {
    name: 'Hearts',
    description: "Express love, affection, and passion with our extensive collection of heart symbols. This category goes beyond the classic red heart, offering a diverse palette of colors and styles. You'll find outlined hearts, broken hearts, beating hearts, and decorative, ornate heart designs. These symbols are perfect for romantic messages, showing appreciation for friends and family, or adding a touch of warmth and kindness to any text. A single heart can speak volumes.",
    symbols: [
        { symbol: '❤', name: 'Red Heart' }, { symbol: '♡', name: 'White Heart Suit' }, { symbol: '♥', name: 'Black Heart Suit' }, { symbol: '❣', name: 'Heavy Heart Exclamation Mark Ornament' },
        { symbol: '❥', name: 'Rotated Heavy Black Heart Bullet' }, { symbol: '❦', name: 'Floral Heart' }, { symbol: '❧', name: 'Rotated Floral Heart Bullet' }, { symbol: '💗', name: 'Growing Heart' },
        { symbol: '💓', name: 'Beating Heart' }, { symbol: '💔', name: 'Broken Heart' }, { symbol: '💕', name: 'Two Hearts' }, { symbol: '💖', name: 'Sparkling Heart' },
        { symbol: '💘', name: 'Heart with Arrow' }, { symbol: '💙', name: 'Blue Heart' }, { symbol: '💚', name: 'Green Heart' }, { symbol: '💛', name: 'Yellow Heart' },
        { symbol: '💜', name: 'Purple Heart' }, { symbol: '💝', name: 'Heart with Ribbon' }, { symbol: '💞', name: 'Revolving Hearts' }, { symbol: '💟', name: 'Heart Decoration' }
    ],
  },
  {
    name: 'Arrows',
    description: "Point the way with our comprehensive set of arrow symbols. Whether you need to indicate direction, create lists, or design flowcharts, this collection has you covered. It includes arrows of all shapes and sizes: simple and bold, curved and straight, single-headed and double-headed. These symbols are fundamental for user interfaces, instructional content, and any text where you need to guide the reader's attention clearly and effectively.",
    symbols: [
        { symbol: '→', name: 'Rightwards Arrow' }, { symbol: '←', name: 'Leftwards Arrow' }, { symbol: '↑', name: 'Upwards Arrow' }, { symbol: '↓', name: 'Downwards Arrow' },
        { symbol: '↔', name: 'Left Right Arrow' }, { symbol: '↕', name: 'Up Down Arrow' }, { symbol: '↖', name: 'North West Arrow' }, { symbol: '↗', name: 'North East Arrow' },
        { symbol: '↘', name: 'South East Arrow' }, { symbol: '↙', name: 'South West Arrow' }, { symbol: '↚', name: 'Leftwards Arrow with Stroke' }, { symbol: '↛', name: 'Rightwards Arrow with Stroke' },
        { symbol: '↮', name: 'Left Right Arrow with Stroke' }, { symbol: '⇂', name: 'Downwards Arrow with Tip Leftwards' }, { symbol: '⇃', name: 'Downwards Arrow with Tip Rightwards' }, { symbol: '⇄', name: 'Rightwards Arrow over Leftwards Arrow' },
        { symbol: '⇅', name: 'Upwards Arrow Leftwards of Downwards Arrow' }, { symbol: '⇆', name: 'Leftwards Arrow over Rightwards Arrow' }, { symbol: '⇇', name: 'Leftwards Paired Arrows' }, { symbol: '⇈', name: 'Upwards Paired Arrows' },
        { symbol: '⇉', name: 'Rightwards Paired Arrows' }, { symbol: '⇊', name: 'Downwards Paired Arrows' }, { symbol: '⇋', name: 'Leftwards Harpoon with Barb Upwards' }, { symbol: '⇌', name: 'Rightwards Harpoon with Barb Upwards' },
        { symbol: '⇍', name: 'Leftwards Double Arrow with Stroke' }, { symbol: '⇎', name: 'Left Right Double Arrow with Stroke' }, { symbol: '⇏', name: 'Rightwards Double Arrow with Stroke' }, { symbol: '⇐', name: 'Leftwards Double Arrow' },
        { symbol: '⇑', name: 'Upwards Double Arrow' }, { symbol: '⇒', name: 'Rightwards Double Arrow' }, { symbol: '⇓', name: 'Downwards Double Arrow' }, { symbol: '⇔', name: 'Left Right Double Arrow' },
        { symbol: '⇕', name: 'Up Down Double Arrow' }, { symbol: '⇖', name: 'North West Double Arrow' }, { symbol: '⇗', name: 'North East Double Arrow' }, { symbol: '⇘', name: 'South East Double Arrow' },
        { symbol: '⇙', name: 'South West Double Arrow' }, { symbol: '⇚', name: 'Leftwards Triple Arrow' }, { symbol: '⇛', name: 'Rightwards Triple Arrow' }, { symbol: '⇜', name: 'Leftwards Squiggle Arrow' },
        { symbol: '⇝', name: 'Rightwards Squiggle Arrow' }, { symbol: '⇞', name: 'Upwards Arrow with Double Stroke' }, { symbol: '⇟', name: 'Downwards Arrow with Double Stroke' }, { symbol: '⇠', name: 'Leftwards Dashed Arrow' },
        { symbol: '⇡', name: 'Upwards Dashed Arrow' }, { symbol: '⇢', name: 'Rightwards Dashed Arrow' }, { symbol: '⇣', name: 'Downwards Dashed Arrow' }, { symbol: '⟵', name: 'Long Leftwards Arrow' },
        { symbol: '⟶', name: 'Long Rightwards Arrow' }, { symbol: '⟷', name: 'Long Left Right Arrow' }, { symbol: '⟸', name: 'Long Leftwards Double Arrow' }, { symbol: '⟹', name: 'Long Rightwards Double Arrow' },
        { symbol: '⟺', name: 'Long Left Right Double Arrow' }, { symbol: '⤂', name: 'Rightwards Arrow with Tail with Vertical Stroke' }, { symbol: '⤃', name: 'Rightwards Arrow with Tail with Double Vertical Stroke' }, { symbol: '⤄', name: 'Rightwards Arrow with Tail' },
        { symbol: '⤅', name: 'Rightwards Two-Headed Arrow with Tail' }, { symbol: '⤆', name: 'Rightwards Two-Headed Arrow with Tail with Vertical Stroke' }, { symbol: '⤇', name: 'Rightwards Two-Headed Arrow with Tail with Double Vertical Stroke' }, { symbol: '⤈', name: 'Leftwards Arrow-Tail' },
        { symbol: '⤉', name: 'Rightwards Arrow-Tail' }, { symbol: '⤊', name: 'Upwards Arrow-Tail' }, { symbol: '⤋', name: 'Downwards Arrow-Tail' }, { symbol: '⤌', name: 'Leftwards Arrow to Bar' },
        { symbol: '⤍', name: 'Rightwards Arrow to Bar' }, { symbol: '⤎', name: 'Upwards Arrow to Bar' }, { symbol: '⤏', name: 'Downwards Arrow to Bar' }
    ],
  },
  {
    name: 'Emoji',
    description: "Dive into the expressive world of emojis, the universal language of the digital age. This curated selection includes a wide range of faces conveying every possible emotion, from joy and laughter to sadness and anger. You'll also find hand gestures, people, and various other iconic images that add personality and nuance to your conversations. Using emojis can make your text more engaging and help convey tone accurately.",
    symbols: [
      { symbol: '😀', name: 'Grinning Face' }, { symbol: '😁', name: 'Beaming Face with Smiling Eyes' }, { symbol: '😂', name: 'Face with Tears of Joy' }, { symbol: '🤣', name: 'Rolling on the Floor Laughing' },
      { symbol: '😃', name: 'Grinning Face with Big Eyes' }, { symbol: '😄', name: 'Grinning Face with Smiling Eyes' }, { symbol: '😅', name: 'Grinning Squinting Face' }, { symbol: '😆', name: 'Grinning Squinting Face' },
      { symbol: '😉', name: 'Winking Face' }, { symbol: '😊', name: 'Smiling Face with Smiling Eyes' }, { symbol: '😋', name: 'Face Savoring Food' }, { symbol: '😎', name: 'Smiling Face with Sunglasses' },
      { symbol: '😍', name: 'Smiling Face with Heart-Eyes' }, { symbol: '😘', name: 'Face Blowing a Kiss' }, { symbol: '🥰', name: 'Smiling Face with Hearts' }, { symbol: '😗', name: 'Kissing Face' },
      { symbol: '😙', name: 'Kissing Face with Smiling Eyes' }, { symbol: '😚', name: 'Kissing Face with Closed Eyes' }, { symbol: '🙂', name: 'Slightly Smiling Face' }, { symbol: '🤗', name: 'Hugging Face' },
      { symbol: '🤩', name: 'Star-Struck' }, { symbol: '🤔', name: 'Thinking Face' }, { symbol: '🤨', name: 'Face with Raised Eyebrow' }, { symbol: '😐', name: 'Neutral Face' },
      { symbol: '😑', name: 'Expressionless Face' }, { symbol: '😶', name: 'Face Without Mouth' }, { symbol: '🙄', name: 'Face with Rolling Eyes' }, { symbol: '😏', name: 'Smirking Face' },
      { symbol: '😣', name: 'Persevering Face' }, { symbol: '😥', name: 'Sad but Relieved Face' }, { symbol: '😮', name: 'Face with Open Mouth' }, { symbol: '🤐', name: 'Zipper-Mouth Face' },
      { symbol: '😯', name: 'Hushed Face' }, { symbol: '😪', name: 'Sleepy Face' }, { symbol: '😫', name: 'Tired Face' }, { symbol: '😴', name: 'Sleeping Face' },
      { symbol: '😌', name: 'Relieved Face' }, { symbol: '😛', name: 'Face with Tongue' }, { symbol: '😜', name: 'Winking Face with Tongue' }, { symbol: '😝', name: 'Squinting Face with Tongue' },
      { symbol: '🤤', name: 'Drooling Face' }, { symbol: '😒', name: 'Unamused Face' }, { symbol: '😓', name: 'Downcast Face with Sweat' }, { symbol: '😔', name: 'Pensive Face' },
      { symbol: '😕', name: 'Confused Face' }, { symbol: '🙃', name: 'Upside-Down Face' }, { symbol: '🤑', name: 'Money-Mouth Face' }, { symbol: '😲', name: 'Astonished Face' },
      { symbol: '☹️', name: 'Frowning Face' }, { symbol: '🙁', name: 'Slightly Frowning Face' }, { symbol: '😖', name: 'Confounded Face' }, { symbol: '😞', name: 'Disappointed Face' },
      { symbol: '😟', name: 'Worried Face' }, { symbol: '😤', name: 'Face with Steam From Nose' }, { symbol: '😢', name: 'Crying Face' }, { symbol: '😭', name: 'Loudly Crying Face' },
      { symbol: '😦', name: 'Frowning Face with Open Mouth' }, { symbol: '😧', name: 'Anguished Face' }, { symbol: '😨', name: 'Fearful Face' }, { symbol: '😩', name: 'Weary Face' },
      { symbol: '🤯', name: 'Exploding Head' }, { symbol: '😬', name: 'Grimacing Face' }, { symbol: '😰', name: 'Anxious Face with Sweat' }, { symbol: '😱', name: 'Face Screaming in Fear' },
      { symbol: '🥵', name: 'Hot Face' }, { symbol: '🥶', name: 'Cold Face' }, { symbol: '😳', name: 'Flushed Face' }, { symbol: '🤪', name: 'Zany Face' },
      { symbol: '😵', name: 'Dizzy Face' }, { symbol: '😡', name: 'Pouting Face' }, { symbol: '😠', name: 'Angry Face' }, { symbol: '🤬', name: 'Face with Symbols on Mouth' },
      { symbol: '😷', name: 'Face with Medical Mask' }, { symbol: '🤒', name: 'Face with Thermometer' }, { symbol: '🤕', name: 'Face with Head-Bandage' }, { symbol: '🤢', name: 'Nauseated Face' },
      { symbol: '🤮', name: 'Face Vomiting' }, { symbol: '🤧', name: 'Sneezing Face' }, { symbol: '😇', name: 'Smiling Face with Halo' }, { symbol: '🤠', name: 'Cowboy Hat Face' },
      { symbol: '🤡', name: 'Clown Face' }, { symbol: '🥳', name: 'Partying Face' }, { symbol: '🥴', name: 'Woozy Face' }, { symbol: '🥺', name: 'Pleading Face' },
      { symbol: '🤥', name: 'Lying Face' }, { symbol: '🤫', name: 'Shushing Face' }, { symbol: '🤭', name: 'Face with Hand Over Mouth' }, { symbol: '🧐', name: 'Face with Monocle' },
      { symbol: '🤓', name: 'Nerd Face' }, { symbol: '😈', name: 'Smiling Face with Horns' }, { symbol: '👿', name: 'Angry Face with Horns' }, { symbol: '👹', name: 'Ogre' },
      { symbol: '👺', name: 'Goblin' }, { symbol: '💀', name: 'Skull' }, { symbol: '👻', name: 'Ghost' }, { symbol: '👽', name: 'Alien' },
      { symbol: '🤖', name: 'Robot' }, { symbol: '💩', name: 'Pile of Poo' }, { symbol: '😺', name: 'Grinning Cat' }, { symbol: '😸', name: 'Grinning Cat with Smiling Eyes' },
      { symbol: '😹', name: 'Cat with Tears of Joy' }, { symbol: '😻', name: 'Smiling Cat with Heart-Eyes' }, { symbol: '😼', name: 'Cat with Wry Smile' }, { symbol: '😽', name: 'Kissing Cat' },
      { symbol: '🙀', name: 'Weary Cat' }, { symbol: '😿', name: 'Crying Cat' }, { symbol: '😾', name: 'Pouting Cat' }, { symbol: '👋', name: 'Waving Hand' },
      { symbol: '🤚', name: 'Raised Back of Hand' }, { symbol: '🖐', name: 'Hand with Fingers Splayed' }, { symbol: '✋', name: 'Raised Hand' }, { symbol: '🖖', name: 'Vulcan Salute' },
      { symbol: '👌', name: 'OK Hand' }, { symbol: '🤏', name: 'Pinching Hand' }, { symbol: '✌️', name: 'Victory Hand' }, { symbol: '🤞', name: 'Crossed Fingers' },
      { symbol: '🤟', name: 'Love-You Gesture' }, { symbol: '🤘', name: 'Sign of the Horns' }, { symbol: '🤙', name: 'Call Me Hand' }, { symbol: '👈', name: 'Backhand Index Pointing Left' },
      { symbol: '👉', name: 'Backhand Index Pointing Right' }, { symbol: '👆', name: 'Backhand Index Pointing Up' }, { symbol: '🖕', name: 'Middle Finger' }, { symbol: '👇', name: 'Backhand Index Pointing Down' },
      { symbol: '☝️', name: 'Index Pointing Up' }, { symbol: '👍', name: 'Thumbs Up' }, { symbol: '👎', name: 'Thumbs Down' }, { symbol: '✊', name: 'Raised Fist' },
      { symbol: '👊', name: 'Oncoming Fist' }, { symbol: '🤛', name: 'Left-Facing Fist' }, { symbol: '🤜', name: 'Right-Facing Fist' }, { symbol: '👏', name: 'Clapping Hands' },
      { symbol: '🙌', name: 'Raising Hands' }, { symbol: '👐', name: 'Open Hands' }, { symbol: '🤲', name: 'Palms Up Together' }, { symbol: '🤝', name: 'Handshake' },
      { symbol: '🙏', name: 'Folded Hands' }, { symbol: '✍️', name: 'Writing Hand' }, { symbol: '💅', name: 'Nail Polish' }, { symbol: '🤳', name: 'Selfie' },
      { symbol: '💪', name: 'Flexed Biceps' }, { symbol: '🦾', name: 'Mechanical Arm' }, { symbol: '🦵', name: 'Leg' }, { symbol: '🦿', name: 'Mechanical Leg' },
      { symbol: '🦶', name: 'Foot' }, { symbol: '👣', name: 'Footprints' }, { symbol: '👂', name: 'Ear' }, { symbol: '🦻', name: 'Ear with Hearing Aid' },
      { symbol: '👃', name: 'Nose' }, { symbol: '🧠', name: 'Brain' }, { symbol: '🦷', name: 'Tooth' }, { symbol: '🦴', name: 'Bone' },
      { symbol: '👀', name: 'Eyes' }, { symbol: '👁', name: 'Eye' }, { symbol: '👅', name: 'Tongue' }, { symbol: '👄', name: 'Mouth' },
      { symbol: '💋', name: 'Kiss Mark' }, { symbol: '🩸', name: 'Drop of Blood' }
    ],
  },
  {
    name: 'Currency',
    description: "Handle finances in any language with our complete collection of currency symbols from around the world. This category features well-known signs like the Dollar, Euro, Pound, and Yen, as well as many less common symbols for global currencies. These characters are essential for financial reports, e-commerce websites, pricing tables, and any discussion involving money. Ensure your monetary values are clear and professional by using the correct, standardized symbol.",
    symbols: [
        { symbol: '$', name: 'Dollar Sign' }, { symbol: '€', name: 'Euro Sign' }, { symbol: '£', name: 'Pound Sign' }, { symbol: '¥', name: 'Yen Sign' },
        { symbol: '¢', name: 'Cent Sign' }, { symbol: '₹', name: 'Indian Rupee Sign' }, { symbol: '₽', name: 'Ruble Sign' }, { symbol: '₩', name: 'Won Sign' },
        { symbol: '฿', name: 'Baht Sign' }, { symbol: '₫', name: 'Dong Sign' }, { symbol: '₪', name: 'New Sheqel Sign' }, { symbol: '₲', name: 'Guarani Sign' },
        { symbol: '₴', name: 'Hryvnia Sign' }, { symbol: '₵', name: 'Cedi Sign' }, { symbol: '₸', name: 'Tenge Sign' }, { symbol: '₺', name: 'Turkish Lira Sign' },
        { symbol: '₱', name: 'Peso Sign' }, { symbol: '₣', name: 'Franc Sign' }, { symbol: '₤', name: 'Lira Sign' }, { symbol: '₧', name: 'Peseta Sign' },
        { symbol: '₯', name: 'Drachma Sign' }, { symbol: '₰', name: 'German Penny Sign' }, { symbol: '₳', name: 'Austral Sign' }, { symbol: '₠', name: 'Euro-Currency Sign' },
        { symbol: '₢', name: 'Cruzeiro Sign' }, { symbol: '₥', name: 'Mill Sign' }, { symbol: '₦', name: 'Naira Sign' }, { symbol: '₶', name: 'Livre Tournois Sign' },
        { symbol: '₷', name: 'Spesmilo Sign' }, { symbol: '₻', name: 'Nordic Mark Sign' }, { symbol: '₿', name: 'Bitcoin Sign' }
    ],
  },
  {
    name: 'Math',
    description: "From basic arithmetic to advanced calculus, this category contains all the mathematical symbols you need to write clear and accurate equations. It includes operators, variables, relational symbols, and set theory notations. Whether you're a student, teacher, or scientist, these symbols are indispensable for academic papers, online tutorials, and technical documentation. Find symbols for infinity, integrals, sums, and logical operators, all in one convenient place.",
    symbols: [
        { symbol: '∀', name: 'For All' }, { symbol: '∂', name: 'Partial Differential' }, { symbol: '∃', name: 'There Exists' }, { symbol: '∅', name: 'Empty Set' },
        { symbol: '∇', name: 'Nabla' }, { symbol: '∈', name: 'Element Of' }, { symbol: '∉', name: 'Not an Element Of' }, { symbol: '∋', name: 'Contains as Member' },
        { symbol: '∏', name: 'N-Ary Product' }, { symbol: '∑', name: 'N-Ary Summation' }, { symbol: '−', name: 'Minus Sign' }, { symbol: '∗', name: 'Asterisk Operator' },
        { symbol: '√', name: 'Square Root' }, { symbol: '∝', name: 'Proportional To' }, { symbol: '∞', name: 'Infinity' }, { symbol: '∠', name: 'Angle' },
        { symbol: '∧', name: 'Logical And' }, { symbol: '∨', name: 'Logical Or' }, { symbol: '∩', name: 'Intersection' }, { symbol: '∪', name: 'Union' },
        { symbol: '∫', name: 'Integral' }, { symbol: '∬', name: 'Double Integral' }, { symbol: '∮', name: 'Contour Integral' }, { symbol: '∴', name: 'Therefore' },
        { symbol: '∵', name: 'Because' }, { symbol: '∶', name: 'Ratio' }, { symbol: '∼', name: 'Tilde Operator' }, { symbol: '≈', name: 'Almost Equal To' },
        { symbol: '≉', name: 'Not Almost Equal To' }, { symbol: '≅', name: 'Approximately Equal To' }, { symbol: '≠', name: 'Not Equal To' }, { symbol: '≡', name: 'Identical To' },
        { symbol: '≤', name: 'Less-Than or Equal To' }, { symbol: '≥', name: 'Greater-Than or Equal To' }, { symbol: '⊂', name: 'Subset Of' }, { symbol: '⊃', name: 'Superset Of' },
        { symbol: '⊄', name: 'Not a Subset Of' }, { symbol: '⊅', name: 'Not a Superset Of' }, { symbol: '⊆', name: 'Subset of or Equal To' }, { symbol: '⊇', name: 'Superset of or Equal To' },
        { symbol: '⊕', name: 'Circled Plus' }, { symbol: '⊖', name: 'Circled Minus' }, { symbol: '⊗', name: 'Circled Times' }, { symbol: '⊘', name: 'Circled Division Slash' },
        { symbol: '⊙', name: 'Circled Dot Operator' }, { symbol: '⊥', name: 'Up Tack' }, { symbol: '⊧', name: 'Models' }, { symbol: '⊨', name: 'True' }
    ],
  },
  {
    name: 'Brackets',
    description: "Frame your text with style using this diverse assortment of bracket symbols. This collection goes far beyond standard parentheses and square brackets, offering a wide variety of decorative and specialized corner, lenticular, and angle brackets. These are perfect for creating visually distinct text segments in gaming nicknames, highlighting quotes in social media, or adding a unique flair to your typography. Find the perfect enclosure for any text.",
    symbols: [
        { symbol: '〈', name: 'Left-Pointing Angle Bracket' }, { symbol: '〉', name: 'Right-Pointing Angle Bracket' }, { symbol: '《', name: 'Left Double Angle Bracket' }, { symbol: '》', name: 'Right Double Angle Bracket' },
        { symbol: '「', name: 'Left Corner Bracket' }, { symbol: '」', name: 'Right Corner Bracket' }, { symbol: '『', name: 'Left White Corner Bracket' }, { symbol: '』', name: 'Right White Corner Bracket' },
        { symbol: '【', name: 'Left Black Lenticular Bracket' }, { symbol: '】', name: 'Right Black Lenticular Bracket' }, { symbol: '〔', name: 'Left Tortoise Shell Bracket' }, { symbol: '〕', name: 'Right Tortoise Shell Bracket' },
        { symbol: '〖', name: 'Left White Lenticular Bracket' }, { symbol: '〗', name: 'Right White Lenticular Bracket' }, { symbol: '〘', name: 'Left White Tortoise Shell Bracket' }, { symbol: '〙', name: 'Right White Tortoise Shell Bracket' },
        { symbol: '〚', name: 'Left White Square Bracket' }, { symbol: '〛', name: 'Right White Square Bracket' }, { symbol: '﹙', name: 'Small Left Parenthesis' }, { symbol: '﹚', name: 'Small Right Parenthesis' },
        { symbol: '﹛', name: 'Small Left Curly Bracket' }, { symbol: '﹜', name: 'Small Right Curly Bracket' }, { symbol: '﹝', name: 'Small Left Tortoise Shell Bracket' }, { symbol: '﹞', name: 'Small Right Tortoise Shell Bracket' }
    ],
  },
  {
    name: 'Chess',
    description: "Checkmate! This category features a complete set of chess piece symbols, including the King, Queen, Rook, Bishop, Knight, and Pawn for both black and white. These icons are perfect for chess notation, articles, tutorials, or for adding a strategic, intellectual theme to your online profiles and messages. Whether you're analyzing a famous game or just want to show your love for the classic board game, these symbols are a perfect move.",
    symbols: [
        { symbol: '♔', name: 'White Chess King' }, { symbol: '♕', name: 'White Chess Queen' }, { symbol: '♖', name: 'White Chess Rook' }, { symbol: '♗', name: 'White Chess Bishop' },
        { symbol: '♘', name: 'White Chess Knight' }, { symbol: '♙', name: 'White Chess Pawn' }, { symbol: '♚', name: 'Black Chess King' }, { symbol: '♛', name: 'Black Chess Queen' },
        { symbol: '♜', name: 'Black Chess Rook' }, { symbol: '♝', name: 'Black Chess Bishop' }, { symbol: '♞', name: 'Black Chess Knight' }, { symbol: '♟', name: 'Black Chess Pawn' }
    ],
  },
  {
    name: 'Cards',
    description: "Play your cards right with this set of symbols for the four classic playing card suits: Spades, Hearts, Diamonds, and Clubs. Both outlined and solid versions are available. These icons are ideal for discussions about card games like poker or bridge, for casino-themed content, or simply for adding a touch of luck and chance to your text. They are universally recognized and perfect for creating a stylish, game-related aesthetic in your nicknames and posts.",
    symbols: [
        { symbol: '♠', name: 'Black Spade Suit' }, { symbol: '♡', name: 'White Heart Suit' }, { symbol: '♢', name: 'White Diamond Suit' }, { symbol: '♣', name: 'Black Club Suit' },
        { symbol: '♤', name: 'White Spade Suit' }, { symbol: '♥', name: 'Black Heart Suit' }, { symbol: '♦', name: 'Black Diamond Suit' }, { symbol: '♧', name: 'White Club Suit' }
    ],
  },
  {
    name: 'Games',
    description: "Level up your text with these classic game-related symbols. This category includes dice faces from one to six, a full die, and a joystick icon, perfect for any content related to tabletop or video gaming. Use them to talk about your favorite RPG, a lucky roll, or your passion for gaming in general. These symbols add a fun, playful element to your profiles, clan descriptions, and social media updates, showing off your gamer identity.",
    symbols: [
        { symbol: '⚀', name: 'Die Face-1' }, { symbol: '⚁', name: 'Die Face-2' }, { symbol: '⚂', name: 'Die Face-3' }, { symbol: '⚃', name: 'Die Face-4' },
        { symbol: '⚄', name: 'Die Face-5' }, { symbol: '⚅', name: 'Die Face-6' }, { symbol: '🎲', name: 'Game Die' }, { symbol: '🎮', name: 'Video Game' },
        { symbol: '🕹️', name: 'Joystick' }
    ],
  },
  {
    name: 'Gender',
    description: "This category provides a collection of symbols representing gender and sexuality, including the common male, female, and transgender signs, as well as various other symbols used to denote different identities. These symbols are useful in discussions of identity, for use in profiles to specify pronouns or orientation, and in academic or social contexts. They provide a concise and clear way to communicate important aspects of identity.",
    symbols: [
        { symbol: '♂', name: 'Male Sign' }, { symbol: '♀', name: 'Female Sign' }, { symbol: '⚥', name: 'Male and Female Sign' }, { symbol: '⚤', name: 'Interlocked Female and Male Sign' },
        { symbol: '⚢', name: 'Doubled Female Sign' }, { symbol: '⚣', name: 'Doubled Male Sign' }, { symbol: '⚧', name: 'Transgender Symbol' }, { symbol: '⚨', name: 'Vertical Male with Stroke Sign' },
        { symbol: '⚩', name: 'Horizontal Male with Stroke Sign' }, { symbol: '⚪', name: 'Medium White Circle' }
    ],
  },
  {
    name: 'Music',
    description: "Compose your message with our collection of musical notation symbols. This category includes notes, rests, clefs, and accidentals like flats, sharps, and naturals. These are essential for musicians, music teachers, and fans who want to write about music theory, share snippets of melodies, or simply express their love for music. Add a melodic touch to your social media bio or create a unique, music-themed username that hits all the right notes.",
    symbols: [
        { symbol: '♩', name: 'Quarter Note' }, { symbol: '♪', name: 'Eighth Note' }, { symbol: '♫', name: 'Beamed Eighth Notes' }, { symbol: '♬', name: 'Beamed Sixteenth Notes' },
        { symbol: '♭', name: 'Music Flat Sign' }, { symbol: '♮', name: 'Music Natural Sign' }, { symbol: '♯', name: 'Music Sharp Sign' }, { symbol: '𝄞', name: 'G Clef' },
        { symbol: '𝄟', name: 'C Clef' }, { symbol: '𝄠', name: 'F Clef' }, { symbol: '𝄡', name: 'Whole Note' }, { symbol: '𝄢', name: 'Half Note' },
        { symbol: '𝄣', name: 'Quarter Note' }, { symbol: '𝄤', name: 'Eighth Note' }, { symbol: '𝄥', name: 'Sixteenth Note' }, { symbol: '𝄦', name: 'Thirty-Second Note' },
        { symbol: '𝄩', name: 'Whole Rest' }, { symbol: '𝄪', name: 'Music Double Sharp Sign' }
    ],
  },
  {
    name: 'Weather',
    description: "Talk about the weather with this forecast of symbols. This collection features icons for all conditions, including the sun, clouds, rain, snow, and lightning. Whether you're giving a weather update, setting a mood in a story, or just looking for a cute symbol to add to your post, you'll find the perfect icon here. These symbols are easily understood and can add a quick visual cue to any weather-related text, from sunny days to stormy nights.",
    symbols: [
        { symbol: '☀', name: 'Black Sun with Rays' }, { symbol: '☁', name: 'Cloud' }, { symbol: '☂', name: 'Umbrella' }, { symbol: '☃', name: 'Snowman' },
        { symbol: '☄', name: 'Comet' }, { symbol: '☼', name: 'White Sun with Rays' }, { symbol: '☽', name: 'First Quarter Moon' }, { symbol: '☾', name: 'Last Quarter Moon' },
        { symbol: '♁', name: 'Earth' }, { symbol: '♨', name: 'Hot Springs' }, { symbol: '❄', name: 'Snowflake' }, { symbol: '❅', name: 'Tight Trifoliate Snowflake' },
        { symbol: '❆', name: 'Heavy Chevron Snowflake' }, { symbol: '༄', name: 'Tibetan Symbol' }, { symbol: ' வெப்பநிலை', name: 'Temperature' }
    ],
  },
  {
    name: 'Planets',
    description: "Explore the solar system with our set of astronomical symbols for the planets. This category includes the Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto. These ancient symbols are perfect for astronomy buffs, astrology enthusiasts, or anyone wanting to add a cosmic or scientific feel to their text. Use them in educational content, sci-fi discussions, or to create an out-of-this-world online identity.",
    symbols: [
        { symbol: '☉', name: 'Sun' }, { symbol: '☿', name: 'Mercury' }, { symbol: '♀', name: 'Venus' }, { symbol: '♁', name: 'Earth' },
        { symbol: '♂', name: 'Mars' }, { symbol: '♃', name: 'Jupiter' }, { symbol: '♄', name: 'Saturn' }, { symbol: '♅', name: 'Uranus' },
        { symbol: '♆', name: 'Neptune' }, { symbol: '♇', name: 'Pluto' }
    ],
  },
  {
    name: 'Zodiac',
    description: "What's your sign? This category contains the twelve symbols of the zodiac, from Aries to Pisces. These icons are essential for astrologers, horoscope writers, and anyone interested in the celestial arts. They are perfect for personalizing your profile based on your birth sign, discussing astrological charts, or adding a mystical flair to your social media posts. Find your sign and let the stars guide your text.",
    symbols: [
        { symbol: '♈', name: 'Aries' }, { symbol: '♉', name: 'Taurus' }, { symbol: '♊', name: 'Gemini' }, { symbol: '♋', name: 'Cancer' },
        { symbol: '♌', name: 'Leo' }, { symbol: '♍', name: 'Virgo' }, { symbol: '♎', name: 'Libra' }, { symbol: '♏', name: 'Scorpius' },
        { symbol: '♐', name: 'Sagittarius' }, { symbol: '♑', name: 'Capricorn' }, { symbol: '♒', name: 'Aquarius' }, { symbol: '♓', name: 'Pisces' }
    ],
  },
  {
    name: 'Office',
    description: "Get down to business with this collection of office- and communication-related symbols. Here you'll find icons for scissors, telephones, airplanes, envelopes, pencils, and checkmarks. These are perfect for business documents, email signatures, contact information pages, and to-do lists. They provide clear, universally understood visual cues for common actions and objects, helping you communicate more efficiently and professionally.",
    symbols: [
        { symbol: '✁', name: 'Upper Blade Scissors' }, { symbol: '✂', name: 'Black Scissors' }, { symbol: '✃', name: 'Lower Blade Scissors' }, { symbol: '✄', name: 'White Scissors' },
        { symbol: '☎', name: 'Black Telephone' }, { symbol: '☏', name: 'White Telephone' }, { symbol: '✆', name: 'Telephone Location Sign' }, { symbol: '✇', name: 'Tape Drive' },
        { symbol: '✈', name: 'Airplane' }, { symbol: '✉', name: 'Envelope' }, { symbol: '☛', name: 'Black Right Pointing Index' }, { symbol: '☚', name: 'Black Left Pointing Index' },
        { symbol: '☜', name: 'White Left Pointing Index' }, { symbol: '☝', name: 'White Up Pointing Index' }, { symbol: '☞', name: 'White Right Pointing Index' }, { symbol: '☟', name: 'White Down Pointing Index' },
        { symbol: '✏', name: 'Pencil' }, { symbol: '✎', name: 'Lower Right Pencil' }, { symbol: '✒', name: 'Black Nib' }, { symbol: '✓', name: 'Check Mark' },
        { symbol: '✔', name: 'Heavy Check Mark' }, { symbol: '✕', name: 'Multiplication X' }, { symbol: '✖', name: 'Heavy Multiplication X' }, { symbol: '✗', name: 'Ballot X' },
        { symbol: '✘', name: 'Heavy Ballot X' }, { symbol: '✙', name: 'Outlined Greek Cross' }, { symbol: '✚', name: 'Heavy Greek Cross' }, { symbol: '✛', name: 'Open Centre Cross' },
        { symbol: '✜', name: 'Heavy Open Centre Cross' }, { symbol: '✝', name: 'Latin Cross' }, { symbol: '✞', name: 'Shadowed White Latin Cross' }, { symbol: '✟', name: 'Outlined Latin Cross' },
        { symbol: '✠', name: 'Maltese Cross' }, { symbol: '✡', name: 'Star of David' }, { symbol: '✢', name: 'Four Teardrop-Spoked Asterisk' }, { symbol: '✣', name: 'Four Balloon-Spoked Asterisk' },
        { symbol: '✤', name: 'Heavy Four Balloon-Spoked Asterisk' }, { symbol: '✥', name: 'Four Club-Spoked Asterisk' }
    ],
  },
  {
    name: 'Punctuation',
    description: "Elevate your writing with this set of special punctuation marks and typographic symbols. This category includes various dashes, quotes, and other symbols not easily found on a standard keyboard. Using the correct typographic characters, like proper quotation marks or an em dash, can make your writing look more polished and professional. These are essential for writers, editors, and anyone who cares about the finer details of typography.",
    symbols: [
        { symbol: '·', name: 'Middle Dot' }, { symbol: '…', name: 'Horizontal Ellipsis' }, { symbol: '–', name: 'En Dash' }, { symbol: '—', name: 'Em Dash' },
        { symbol: '‘', name: 'Left Single Quotation Mark' }, { symbol: '’', name: 'Right Single Quotation Mark' }, { symbol: '“', name: 'Left Double Quotation Mark' }, { symbol: '”', name: 'Right Double Quotation Mark' },
        { symbol: '„', name: 'Double Low-9 Quotation Mark' }, { symbol: '‟', name: 'Double High-Reversed-9 Quotation Mark' }, { symbol: '‹', name: 'Single Left-Pointing Angle Quotation Mark' }, { symbol: '›', name: 'Single Right-Pointing Angle Quotation Mark' },
        { symbol: '«', name: 'Left-Pointing Double Angle Quotation Mark' }, { symbol: '»', name: 'Right-Pointing Double Angle Quotation Mark' }, { symbol: '¡', name: 'Inverted Exclamation Mark' }, { symbol: '¿', name: 'Inverted Question Mark' },
        { symbol: '§', name: 'Section Sign' }, { symbol: '¶', name: 'Pilcrow Sign' }
    ],
  },
  {
    name: 'Roman Numerals',
    description: "Add a touch of classical elegance or create sophisticated outlines with this complete set of Roman numeral symbols. This category includes all the standard characters needed to represent numbers from one to one thousand and beyond. Roman numerals are perfect for list-making, creating a historical or formal tone, or for adding a classic design element to your text. Use them for chapter headings, numbered lists, or stylish clock faces.",
    symbols: [
        { symbol: 'Ⅰ', name: 'Roman Numeral One' }, { symbol: 'Ⅱ', name: 'Roman Numeral Two' }, { symbol: 'Ⅲ', name: 'Roman Numeral Three' }, { symbol: 'Ⅳ', name: 'Roman Numeral Four' },
        { symbol: 'Ⅴ', name: 'Roman Numeral Five' }, { symbol: 'Ⅵ', name: 'Roman Numeral Six' }, { symbol: 'Ⅶ', name: 'Roman Numeral Seven' }, { symbol: 'Ⅷ', name: 'Roman Numeral Eight' },
        { symbol: 'Ⅸ', name: 'Roman Numeral Nine' }, { symbol: 'Ⅹ', name: 'Roman Numeral Ten' }, { symbol: 'Ⅺ', name: 'Roman Numeral Eleven' }, { symbol: 'Ⅻ', name: 'Roman Numeral Twelve' },
        { symbol: 'Ⅼ', name: 'Roman Numeral Fifty' }, { symbol: 'Ⅽ', name: 'Roman Numeral One Hundred' }, { symbol: 'Ⅾ', name: 'Roman Numeral Five Hundred' }, { symbol: 'Ⅿ', name: 'Roman Numeral One Thousand' }
    ],
  },
  {
    name: 'Technical',
    description: "For the tech-savvy, this category collects common symbols found on computer keyboards and in software interfaces. It includes icons for Command, Option, Shift, Control, Enter, and media playback controls. These are indispensable for writing technical documentation, keyboard shortcuts, or user guides. Using these standardized symbols ensures your instructions are clear, concise, and easy for users to understand and follow.",
    symbols: [
        { symbol: '⌘', name: 'Command Key' }, { symbol: '⌥', name: 'Option Key' }, { symbol: '⇧', name: 'Upwards White Arrow from Bar' }, { symbol: '⌃', name: 'Up Arrowhead' },
        { symbol: '⌫', name: 'Erase to the Left' }, { symbol: '⌦', name: 'Erase to the Right' }, { symbol: '⎋', name: 'Broken Circle with Northwest Arrow' }, { symbol: '⏎', name: 'Return Symbol' },
        { symbol: '⏏', name: 'Eject Symbol' }, { symbol: '⏭', name: 'Black Right-Pointing Double Triangle with Vertical Bar' }, { symbol: '⏮', name: 'Black Left-Pointing Double Triangle with Vertical Bar' }, { symbol: '⏯', name: 'Black Right-Pointing Triangle with Double Vertical Bar' },
        { symbol: '⌽', name: 'Power Symbol' }, { symbol: '⏚', name: 'Earth Ground' }, { symbol: '⏛', name: 'Fuse' }, { symbol: '⏣', name: 'Benzene Ring with Circle' },
        { symbol: '⌚', name: 'Watch' }, { symbol: '⌛', name: 'Hourglass' }
    ],
  },
  {
    name: 'Box Drawing',
    description: "Construct text-based diagrams, tables, and borders with this extensive set of box-drawing characters. This category provides all the lines and corners—light, heavy, and double-lined—needed to create complex ASCII and Unicode art. These symbols are a staple for command-line interfaces, code comments, and retro-styled text art. Unleash your creativity and build structured, visually organized text layouts with these fundamental building blocks.",
    symbols: [
        { symbol: '─', name: 'Box Drawings Light Horizontal' }, { symbol: '│', name: 'Box Drawings Light Vertical' }, { symbol: '┌', name: 'Box Drawings Light Down and Right' }, { symbol: '┐', name: 'Box Drawings Light Down and Left' },
        { symbol: '└', name: 'Box Drawings Light Up and Right' }, { symbol: '┘', name: 'Box Drawings Light Up and Left' }, { symbol: '├', name: 'Box Drawings Light Vertical and Right' }, { symbol: '┤', name: 'Box Drawings Light Vertical and Left' },
        { symbol: '┬', name: 'Box Drawings Light Down and Horizontal' }, { symbol: '┴', name: 'Box Drawings Light Up and Horizontal' }, { symbol: '┼', name: 'Box Drawings Light Vertical and Horizontal' }, { symbol: '═', name: 'Box Drawings Double Horizontal' },
        { symbol: '║', name: 'Box Drawings Double Vertical' }, { symbol: '╒', name: 'Box Drawings Down Single and Right Double' }, { symbol: '╓', name: 'Box Drawings Down Double and Right Single' }, { symbol: '╕', name: 'Box Drawings Down Single and Left Double' },
        { symbol: '╖', name: 'Box Drawings Down Double and Left Single' }, { symbol: '╘', name: 'Box Drawings Up Single and Right Double' }, { symbol: '╙', name: 'Box Drawings Up Double and Right Single' }, { symbol: '╛', name: 'Box Drawings Up Single and Left Double' },
        { symbol: '╜', name: 'Box Drawings Up Double and Left Single' }, { symbol: '╞', name: 'Box Drawings Vertical Single and Right Double' }, { symbol: '╟', name: 'Box Drawings Vertical Double and Right Single' }, { symbol: '╤', name: 'Box Drawings Down Single and Horizontal Double' },
        { symbol: '╥', name: 'Box Drawings Down Double and Horizontal Single' }, { symbol: '╧', name: 'Box Drawings Up Single and Horizontal Double' }, { symbol: '╨', name: 'Box Drawings Up Double and Horizontal Single' }, { symbol: '╡', name: 'Box Drawings Vertical Single and Left Double' },
        { symbol: '╢', name: 'Box Drawings Vertical Double and Left Single' }, { symbol: '╪', name: 'Box Drawings Down Single and Horizontal Double' }, { symbol: '╫', name: 'Box Drawings Up Single and Horizontal Double' }, { symbol: '▀', name: 'Upper Half Block' },
        { symbol: '▄', name: 'Lower Half Block' }, { symbol: '█', name: 'Full Block' }, { symbol: '▌', name: 'Left Half Block' }, { symbol: '▐', name: 'Right Half Block' },
        { symbol: '░', name: 'Light Shade' }, { symbol: '▒', name: 'Medium Shade' }, { symbol: '▓', name: 'Dark Shade' }
    ],
  },
];

const allSymbolsRaw: SymbolItem[] = SEARCHABLE_CATEGORIES.flatMap(category => category.symbols);

const uniqueSymbols = Array.from(
  new Map(allSymbolsRaw.map(item => [item.symbol, item])).values()
);


const allCategory: SymbolCategory = {
  name: 'All',
  description: "Explore every symbol available in our entire collection in one comprehensive list. This is your go-to destination when you're not sure what you're looking for and want to browse the full spectrum of characters. From technical and mathematical symbols to decorative and fun emojis, everything is here. Use the search bar to filter this extensive list and quickly find the exact character you need for your project, message, or design. Happy hunting!",
  symbols: uniqueSymbols,
};

export const SYMBOL_CATEGORIES: SymbolCategory[] = [allCategory, ...SEARCHABLE_CATEGORIES];