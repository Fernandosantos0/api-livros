import Livro from '../models/Livro';
import multer from 'multer';
import multerConfigCapa from '../config/multerConfigCapa';

// Configuração do multer (Corrigido: 'name' em vez de 'nome')
const uploads = multer(multerConfigCapa).fields([
    {
        name: 'capa',
        maxCount: 1
    },
    {
        name: 'contracapa', // Corrigido aqui!
        maxCount: 8
    }
]);

class CapaController {

    async store(req, res) {
        // Envolvemos o multer em uma Promise para o async/await funcionar perfeitamente
        uploads(req, res, async function (err) {

            // 1. Tratamento de Erros do Multer
            if (err instanceof multer.MulterError) {
                switch (err.code) {
                    case 'LIMIT_FILE_SIZE':
                        return res.status(400).json({
                            error: 'Arquivo muito grande. O limite máximo é de 3MB por imagem.'
                        });

                    case 'LIMIT_UNEXPECTED_FILE':
                        // Captura o erro do fileFilter (extensão errada) ou campos extras
                        return res.status(400).json({
                            error: err.message || 'Formato de arquivo não suportado ou campo inválido.'
                        });

                    default:
                        // Captura outros erros (ex: enviar mais de 8 contracapas)
                        return res.status(400).json({
                            error: `Erro no upload: ${err.message}`
                        });
                }
            }

            if (err) {
                return res.status(500).json({
                    error: `Erro desconhecido no upload: ${err.message}`
                });
            }

            // 2. Verificação se os arquivos foram enviados
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
            }

            try {
                // Exemplo de como acessar os nomes dos arquivos salvos:
                const capa = req.files['capa'] ? req.files['capa'][0].filename : null;
                const contracapas = req.files['contracapa'] ? req.files['contracapa'].map(f => f.filename) : [];

                // Aqui você pode continuar a lógica do seu banco de dados, ex:
                // const novoLivro = await Livro.create({ ...req.body, capa, contracapas });

                return res.status(200).json({
                    message: 'Upload realizado com sucesso!',
                    dados: req.body,
                    arquivos: { capa, contracapas }
                });

            } catch (e) {
                // Este catch agora captura erros de lógica interna ou de banco de dados
                return res.status(500).json({
                    errors: 'Erro interno ao salvar os dados.'
                });
            }
        });
    }
}

export default new CapaController();
