<template>
    <div class="card ">
        <h1 style="text-transform: capitalize; " class=" titulo_card ">{{ titulo }}</h1>
        <h3 class="des">{{ descripcion }}</h3>
        <div v-if="mostrarBotones" style="display: flex; gap: 1rem">
            <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" class="botones"
                @click="capturar(id)">
                <path fill="currentColor"
                    d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" class="botones"
                @click="editar(id)">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path
                        d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </g>
            </svg>

        </div>

    </div>

</template>
<script>
export default {
    name: 'Card',
    props: {
        titulo: String,
        descripcion: String,
        id: Number,
        capturar: Function,
        editar: Function,
        mostrarBotones: {
            type: Boolean,
            default: true
        }
    }

};

</script>
<style>
@keyframes slide-fwd-center {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.02);
    }
}

.card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border: 4px solid black;
    border-radius: 0;
    box-shadow: 8px 8px 0px black;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 15rem;
    padding: 2rem;
}

.des {
    background-color: #FFFFFF;
    color: black;
    border: 3px solid black;
    box-shadow: 4px 4px 0px black;
    border-radius: 0;
    padding: 0.5rem 1.5rem;
    font-weight: 900;
    font-family: 'League Spartan', sans-serif;
    text-transform: uppercase;
}

.card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px black;
}

.botones {
    color: black;
    background-color: #DC143C;
    border: 3px solid black;
    box-shadow: 4px 4px 0px black;
    padding: 5px;
    width: 2.5em;
    height: 2.5em;
    transition: all 0.2s;
    cursor: pointer;
}

.botones:hover {
    background-color: #FFFFFF;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px black;
}

.titulo_card {
    padding: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    color: black;
    font-family: 'League Spartan', sans-serif;
    font-weight: 900;
}
</style>