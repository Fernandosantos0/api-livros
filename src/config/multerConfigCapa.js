import multer from 'multer'; // Importação do multer necessária aqui
import { resolve, extname } from 'path';
import fs from 'fs';

// Define o caminho final onde as capas serão salvas
const pastaCapas = resolve(__dirname, '..', '..', 'uploads', 'images', 'capas');

// Garante que a árvore de pastas exista antes mesmo do upload acontecer
if (!fs.existsSync(pastaCapas)) {
    fs.mkdirSync(pastaCapas, { recursive: true });
}

export default {
    // Corrigido: Agora usando o diskStorage do Multer
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, pastaCapas);
        },

        filename: function (req, file, cb) {
            // Corrigido: Usando Math.random() para gerar o número aleatório
            const numeroAleatorio = () => Math.floor(Math.random() * 1000);

            // Cria um nome único: ex: 1779218273645_4829.jpg
            const nomeArquivo = `${Date.now()}_${numeroAleatorio()}${extname(file.originalname)}`;
            cb(null, nomeArquivo);
        }
    }),

    // Ativando e configurando o fileFilter que estava comentado
    fileFilter: function (req, file, cb) {
        const extensoesPermitidas = ['.png', '.jpg', '.jpeg', '.webp'];
        const extensaoAtual = extname(file.originalname).toLowerCase();

        if (!extensoesPermitidas.includes(extensaoAtual)) {
            // Rejeita o arquivo enviando um erro personalizado
            return cb(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    'Apenas imagens (PNG, JPG, JPEG, WEBP) são permitidas.'
                )
            );
        }

        // Aceita o arquivo
        cb(null, true);
    },

    // Opcional: Limitar o tamanho do arquivo (ex: 3MB)
    limits: {
        fileSize: 3 * 1024 * 1024
    }
};
