export default [
    {
        title: 'Banc',
        name : 'bench',
        description: [
            {
                sprite: 'none',
                name: 'none',
                text: '(C\'est un banc. Je ne sais pas trop comment je le garde dans ma poche, là...)'
            }
        ],
        status: 'inactive'
    },
    {
        title: 'Cône de circulation sale',
        name : 'cone-dirty',
        description: [
            {
                sprite: 'none',
                name: 'none',
                text: "'C’est un cône de circulation… Il est couvert de boue, je suis obligée de le tenir du bout des doigts. Peut-être que je peux trouver un moyen de le nettoyer."
            }
        ],
        status: 'inactive'
    },
    {
        title: 'Cône de circulation',
        name : 'cone',
        description: [
            {
                sprite: 'none',
                name: 'none',
                displayedItem: 'cone-code',
                text: '(C\'est un cône de circulation orange. Maintenant qu\'il est propre, un dessin bizarre apparait dessus.)'
            },
            {
                sprite: 'none',
                name: 'none',
                displayedItem: 'cone-code',
                text: '(Ça doit sûrement représenter quelque chose par ici.)'
            }
        ],
        status: 'inactive'
    },
    {
        title: "Papier d'équivalences de couleurs",
        name : 'colors-paper',
        description: [
            {
                sprite: 'none',
                name: 'none',
                displayedItem: 'colors-paper',
                text: "C'est un papier avec des couleurs associées à un équivalent numérique. Selon ce qui est indiqué, rouge = 1, jaune = 2, magenta = 3, cyan = 4."
            }
        ],
        status: 'inactive'
    },
    {
        title: "Lampe de poche",
        name : 'flashlight',
        description: [
            {
                sprite: 'none',
                name: 'none',
                displayedItem: 'flashlight',
                text: "C'est une lampe de poche. L'ampoule paraît particulièrement grosse, je n'ai jamais vu une lampe de poche pareille."
            }
        ],
        status: 'inactive'
    }
]