import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=10`;

function App() {
    const [isLoading, setLoading] = useState(true);
        const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState('');
        const [selected, setSelected] = useState(null);
            const openerRef = useRef(null);

            // close modal on Escape and manage focus
            /**
             * useEffect cleanup function
             * to manage focus when modal is closed
             * @description This effect runs whenever the `selected` state changes.
             * @method useEffect
             * @param {HTMLElement} opener - The element that opened the modal
             * @param {HTMLElement} first - The first focusable element inside the modal
             * @param {HTMLElement} last - The last focusable element inside the modal
             * @param {HTMLElement} modal - The modal element itself
             * @param {HTMLElement} first - The first focusable element inside the modal
             * @param {HTMLElement} last - The last focusable element inside the modal
             * @param {HTMLElement} modal - The modal element itself
             * @param {HTMLElement[]} focusable - An array of all focusable elements inside the modal
             * @param {HTMLElement[]} focusable - An array of all focusable elements inside the modal
             * @param {Function} onKey - The event handler for keydown events
             * @param {KeyboardEvent} e - The keydown event
             * @returns {void}
             */
                useEffect(() => {
                    if (!selected) return;

                    // focus management: focus first focusable element inside modal
                    const modal = document.querySelector('.modal');
                    const focusableSelector =
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                    const focusable = modal ? Array.from(modal.querySelectorAll(focusableSelector)) : [];
                    const first = focusable[0] || modal;
                    const last = focusable[focusable.length - 1] || modal;
                    if (first && first.focus) first.focus();

                    const onKey = (e) => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            setSelected(null);
                            return;
                        }
                        if (e.key === 'Tab') {
                            // trap focus inside modal
                            if (focusable.length === 0) {
                                e.preventDefault();
                                return;
                            }
                            const active = document.activeElement;
                            if (e.shiftKey) {
                                if (active === first || active === modal) {
                                    e.preventDefault();
                                    last.focus();
                                }
                            } else {
                                if (active === last || active === modal) {
                                    e.preventDefault();
                                    first.focus();
                                }
                            }
                        }
                    };

                    document.addEventListener('keydown', onKey);

                        const opener = openerRef.current;
                        return () => {
                            document.removeEventListener('keydown', onKey);
                            // when modal closes, return focus to opener if possible
                            if (opener && opener.focus) {
                                opener.focus();
                            }
                        };
                }, [selected]);

    useEffect(() => {
        let cancelled = false;

        const fetchTopPokemon = async () => {
            setLoading(true);
            try {
                const res = await fetch(LIST_URL);
                if (!res.ok) throw new Error(`List request failed: ${res.status}`);
                const list = await res.json();

                // fetch details in parallel
                const details = await Promise.all(
                    list.results.map((p) => fetch(p.url).then((r) => {
                        if (!r.ok) throw new Error(`Detail request failed: ${r.status}`);
                        return r.json();
                    }))
                );

                        // keep full details so we can show more info on click
                        if (!cancelled) {
                            setPokemon(details);
                            setError('');
                            setLoading(false);
                        }
            } catch (err) {
                if (!cancelled) {
                    setError(err.toString());
                    setPokemon([]);
                    setLoading(false);
                }
            }
        };

        fetchTopPokemon();

        return () => {
            cancelled = true;
        };
    }, []);

    // no local alias needed; use setLoading directly

    if (isLoading) return <h2>Loading top 10 Pokémon…</h2>;
    if (error)
        return (
            <div>
                <h2>Failed to load Pokémon</h2>
                <pre>{error}</pre>
            </div>
        );
/**
 * Pokémon Gallery
 * Displays a gallery of the top 10 Pokémon.
 * @description Renders a gallery of Pokémon cards. Each card can be clicked to open a modal with more details about the selected Pokémon.
 * @method render
 * @param {Object} props - The component props
 * @returns {JSX.Element}
 */
    return (
        <main>
            <h1>Top 10 Pokémon Gallery</h1>
            <section className="gallery">
                            {pokemon.map((p) => {
                        const image =
                            p.sprites?.other?.['official-artwork']?.front_default ||
                            p.sprites?.front_default ||
                            null;
                        return (
                            <figure
                                className="card"
                                        key={p.name}
                                        onClick={(e) => {
                                            openerRef.current = e.currentTarget;
                                            setSelected(p);
                                        }}
                                role="button"
                                tabIndex={0}
                            >
                                {image ? (
                                    <img src={image} alt={p.name} loading="lazy" />
                                ) : (
                                    <div className="placeholder">no image</div>
                                )}
                                <figcaption>{p.name}</figcaption>
                            </figure>
                        );
                    })}
            </section>

                {/* Modal */}
                        {selected && (
                            <div
                                className="modal-overlay"
                                onClick={() => setSelected(null)}
                                role="presentation"
                            >
                                <div
                                    className="modal"
                                    onClick={(e) => e.stopPropagation()}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="modal-title"
                                    tabIndex={-1}
                                >
                            <button className="modal-close" onClick={() => setSelected(null)}>
                                ×
                            </button>
                            <div className="modal-body">
                                <img
                                    src={
                                        selected.sprites?.other?.['official-artwork']?.front_default ||
                                        selected.sprites?.front_default ||
                                        ''
                                    }
                                    alt={selected.name}
                                />
                                        <h3 id="modal-title">{selected.name}</h3>
                                <p>
                                    <strong>Types:</strong>{' '}
                                    {selected.types.map((t) => t.type.name).join(', ')}
                                </p>
                                <p>
                                    <strong>Abilities:</strong>{' '}
                                    {selected.abilities.map((a) => a.ability.name).join(', ')}
                                </p>
                                <div className="stats">
                                    <strong>Stats</strong>
                                    <ul>
                                        {selected.stats.map((s) => (
                                            <li key={s.stat.name}>
                                                {s.stat.name}: {s.base_stat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </main>
    );
}

export default App;

// initial code by chris kubick for nucamp, rewritten to show a Poké gallery
