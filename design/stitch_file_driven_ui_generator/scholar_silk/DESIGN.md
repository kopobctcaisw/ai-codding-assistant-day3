# Design System Document: The Academic Architect

## 1. Overview & Creative North Star
The vision for this design system is **"The Academic Architect."** We are moving away from the "startup-in-a-box" aesthetic to create an editorial experience that feels like a prestigious, bespoke institution. This is not just a landing page; it is a curated journey. 

We achieve "Trustworthy" and "High-End" by utilizing expansive white space, intentional asymmetry, and a focus on tonal depth rather than structural lines. By overlapping typography onto image containers and utilizing a sophisticated color palette, we break the traditional grid to suggest a learning environment that is both structured and fluid.

## 2. Colors: Depth Over Definition
This design system utilizes a palette of Deep Navy, Gold, and Soft White to evoke authority and excellence. However, the premium feel is established in how these colors interact.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or containers. 
Boundaries must be defined solely through background color shifts. For example, a feature section using `surface-container-low` (#f2f3f6) should sit directly against the main `surface` (#f8f9fc) background. This "edge-to-edge" tonal shift creates a seamless, high-end feel that borders disrupt.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like fine stationery or stacked architectural glass. 
- **The Canvas:** Use `surface` (#f8f9fc) as the primary background.
- **The Inset:** Use `surface-container-low` (#f2f3f6) for secondary content blocks.
- **The Feature:** Use `surface-container-lowest` (#ffffff) for card components to create a soft, natural lift against the background.

### Signature Textures & Gradients
To avoid a flat, "templated" look:
- **The "Gold Standard" Gradient:** For primary CTAs, do not use a flat gold. Apply a subtle linear gradient from `on-tertiary-container` (#a68230) to `tertiary_fixed_dim` (#ebc168) at a 135-degree angle. This mimics the way light hits metallic foil.
- **The Navy Depth:** In the Hero section, transition from `primary` (#00071b) to `primary_container` (#0f1f3d) to create a sense of infinite, scholarly depth.

## 3. Typography: The Editorial Voice
We use **Manrope** (as the specified professional sans-serif) to balance modern precision with humanist warmth.

- **Display-LG (3.5rem):** Reserved for Hero headlines. Use a tight letter-spacing (-0.02em) to create an authoritative, "printed" look.
- **Headline-MD (1.75rem):** Use for section titles. Pair these with a Gold (`on-tertiary-container`) accent line or "01" numbering to lean into the architectural theme.
- **Body-LG (1rem):** Used for all primary reading. Maintain a generous line-height (1.6) to ensure the content feels approachable and premium.
- **Label-MD (0.75rem):** All caps with increased letter-spacing (+0.05em) for category tags or small subtitles above headlines.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty" and "cheap." In this system, we use light and tone to convey importance.

### The Layering Principle
Instead of a shadow, place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#edeef1) section. The difference in hex value provides all the separation needed.

### Ambient Shadows (The Floating State)
When a floating element (like a hover state) is required, use an **Ambient Shadow**:
- `box-shadow: 0 24px 48px -12px rgba(15, 31, 61, 0.08);`
- Note the color: We use a diluted version of the Navy (`primary_container`), not black. This ensures the shadow feels like it belongs to the environment.

### Glassmorphism
For navigation bars or floating testimonial cards, use a "Frosted Glass" effect:
- **Background:** `rgba(248, 249, 252, 0.8)` (Surface at 80% opacity).
- **Backdrop-blur:** `20px`.
- This allows the rich Navy or Gold of the background to bleed through, keeping the layout integrated.

## 5. Components

### Buttons (The Prominent CTA)
The user requested "prominent rounded buttons." 
- **Primary:** Background uses the "Gold Standard" gradient. Shape is `full` (9999px). Text is `primary` (#00071b).
- **Secondary:** Transparent background with a "Ghost Border" (2px width, `outline_variant` at 20% opacity). On hover, fill with `surface-container-high`.
- **Sizing:** Large buttons should have a minimum height of `3.5rem` with `2rem` horizontal padding to maintain the "High-End" presence.

### Feature & Testimonial Cards
- **Construction:** No borders. Background: `surface-container-lowest`. 
- **Shape:** `xl` (1.5rem) corner radius.
- **Internal Spacing:** Use `2rem` (32px) padding minimum. 
- **Layout:** For testimonials, use an asymmetrical layout where the quote is `Title-MD` and the author's name is a `Label-MD` in Gold. Avoid standard "centered" card layouts.

### Input Fields
- **Style:** Underline-only or subtle tonal shifts. 
- **Default state:** Background `surface-container-low`, bottom-border 2px using `outline_variant` at 30%.
- **Active state:** Bottom-border transforms to `tertiary` (Gold).

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Offset your images. Let a headline hang off the edge of a container. 
- **Use "Tonal Dividers":** Separate content by switching from a white background to a very light grey (`surface-container-low`) background.
- **Prioritize Breathing Room:** If a section feels crowded, double the margin. Premium design is defined by the space you *don't* use.

### Don't:
- **Don't use 100% Black:** Use `primary` (#00071b) for dark text. It maintains the "Navy" brand soul.
- **Don't use Standard Dividers:** Never use a `<hr>` or a 1px line to separate list items. Use vertical spacing (minimum 24px) instead.
- **Don't over-use Gold:** Gold is an accent, not a primary color. Use it for "moments of brilliance"—CTAs, icons, or specific keywords. If everything is gold, nothing is premium.

---
**Director's Final Note:** This design system is a balance of "The Trustworthy Foundation" (Navy/Structure) and "The Personalized Spark" (Gold/Asymmetry). Always ask yourself: *Does this look like a template, or does it look like it was designed specifically for this student?* If it feels too rigid, break a margin. If it feels too messy, align it to the Navy's tonal grid.