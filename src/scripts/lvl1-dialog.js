export default [
    {
        name: 'bus',
        title: 'Arrêt de bus',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "C’est le seul truc qui a l’air un peu normal ici…"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Tu crois que si on attend un peu un bus va venir nous chercher ?"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Regarde la route. Elle s’arrête quelques mètres plus loin. Il n’irait pas bien loin."
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Et alors ? Il n’a qu’à rouler sur le trottoir ! Il n’y a que ça après !"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "C’est bien ça le problème… On n’en voit pas le bout. Comme s’il n’y avait rien à l’horizon."
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Ouais mais un bus ça va super vite. On pourra aller loin."
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Tu as vu d’autres gens aux alentours ? Moi non. Tu vas l’attendre longtemps ton chauffeur de bus."
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "C’était juste une idée ! Et si des alliés parmi les rebelles qui s’opposent au gouvernement tyrannique viennent nous chercher ?"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "(Elle me fatigue...)"
            }
        ],
        defaultText: [
            {
                text: "(C'est un arrêt de bus. Je ne pense pas que ça soit utile d'attendre qu'il y en ait un qui passe...)"
            }
        ]
    },
    {
        name: 'board',
        title: 'Panneau d\'affichage',
        text: [
            {
                spriteProta: 'anaelle',
                name: 'Anaëlle',
                text: "C’est comme si l’affichage avait planté…"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Peut-être qu’on a été attaquées par une arme EMP en fait&nbsp;!"
            },
            {
                spriteProta: 'anaelle',
                name: 'Anaëlle',
                text: "Une arme EMP&nbsp;?"
            },
            {
                sprite: 'roxy',                
                spriteProta: 'none',
                name: 'Roxy',
                text: "C’est une sorte de bombe qui peut paralyser un pays entier&nbsp;! Encore un coup du gouvernement…"
            },
            {
                name: 'Roxy',
                text: "En gros, ça n’explose pas vraiment comme une bombe normale, ça envoie des ondes électromagnétiques qui peuvent détruire presque tous les appareils électroniques et couper les communications."
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "S’ils ont utilisé ça, ça explique tout&nbsp;!"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Ça explique totalement les bâtiments qui volent. Et le fait que l’écran s’allume encore. Et les objets qui se tordent. Et-"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Mais qu’est-ce que tu racontes&nbsp;? Ça n’explique rien de tout ça."
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "…Tu as déjà entendu parler du sarcasme&nbsp;?"
            }
        ],
        defaultText: [
            {
                text: "(C'est un panneau d'affichage avec un écran qui semble avoir planté. L'informatique de nos jours…)"
            }
        ]
    },
    {
        name: 'fountain',
        title: 'Fontaine',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "C’est… la fontaine du parc&nbsp;?"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Hmm, on dirait bien… Mais pourquoi l’eau monte dans les airs et est figée comme ça&nbsp;?"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Ce n’est pas toi qui es censée avoir la réponse à toute les questions&nbsp;?"
            }
        ],
        defaultText: [
            {
                text: "(Une fontaine dont l'eau semble couler vers le ciel. Je me demande si elle est potable.)"
            }
        ]
    },
    {
        name: 'trashbin',
        title: 'Poubelle',
        text: [
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: 'Anaëlle&nbsp;!! Regarde ce que j’ai trouvé&nbsp;!'
            },
            {
                sprite: 'none',
                name: 'none',
                text: 'Obtenu : Cône de circulation sale.',
                inventory: 'add',
                targetItem: 'cone-dirty'
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Ugh, c’est répugnant. Il est plein de boue. Où est-ce que tu as trouvé ça ?"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "Là. Dans la poubelle."
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Mais pourquoi tu me donnes ça&nbsp;? On ne t’a jamais appris à faire des cadeaux&nbsp;?"
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: "J’en sais rien moi&nbsp;! Je me disais que ce serait utile&nbsp;!"
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "Bon sang…"
            }
        ],
        defaultText: [
            {
                text: "(Une poubelle tout ce qu'il y a de plus normal. Si l'on oublie les morceaux qui semblent se détacher et flotter dans les airs, bien sûr.)"
            }
        ]
    },
    {
        name: 'bench',
        title: 'Banc flottant',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: 'C\'est un banc.'
            },
            {
                sprite: 'none',
                name: 'none',
                text: 'Obtenu : Banc.',
                inventory: 'add',
                targetItem: 'bench'
            }
        ],
        defaultText: [
            {
                text: "Un banc qui flotte dans les airs."   
            }
        ]
    },
    {
        name: 'door',
        title: 'Porte',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: "On dirait qu'on peut entrer un code..."
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: 'Tu veux essayer ?'
            },
            {
                sprite: 'none',
                name: 'none',
                text: 'Entrez le code de la porte. (3 chiffres)',
                specialAction: 'code'
            }
        ],
        defaultText: [
            {
                text: "(Je pourrais essayer d'entrer un code…)",
                specialAction: 'code'
            }
        ]
    },
    {
        name: 'interaction-trashbin',
        object: 'bench',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: 'J\'utilise le banc sur la poubelle.'
            }
        ]
    },
    {
        name: 'interaction-fountain',
        object: 'cone-dirty',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: '...! Peut-être que si je le trempe dans l\'eau...'
            },
            {
                sprite: 'none',
                name: 'none',
                text: 'Utilisé : Cône de circulation sale.',
                inventory: 'remove',
                targetItem: 'cone-dirty'
            },
            {
                sprite: 'none',
                name: 'none',
                text: 'Obtenu : Cône de circulation.',
                inventory: 'add',
                targetItem: 'cone'
            },
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: 'Mh&nbsp;? On dirait qu\'il y a quelque chose dessus.'
            }
            
        ]
    },
    {
        name: 'interaction-default',
        object: '/',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: 'Je ne peux pas utiliser ça là-dessus...'
            }
        ]
    },
    {
        name: 'code-false',
        text: [
            {
                sprite: 'anaelle',
                name: 'Anaëlle',
                text: 'On dirait que ce n\'est pas le bon code...'
            },
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: 'Réessayons quand on aura un peu plus fouillé&nbsp;!'
            }
        ],
        defaultText: [
            {
                text: "(Ce n'est pas le bon code…)"
            }
        ]
    },
    {
        name: 'code-true',
        text: [
            {
                sprite: 'roxy',
                name: 'Roxy',
                text: 'WOUHHHH BRAVO ANAËLLE&nbsp;!!!!'
            }
        ]
    }
];