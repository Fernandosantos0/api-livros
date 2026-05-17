#!/bin/bash

# Aborta o script se qualquer comando falhar
set -e

echo "======================================="
echo "🚀 Iniciando automação do Git..."
echo "======================================="

# 1. Adiciona todas as modificações
echo "📦 Adicionando arquivos (git add .)..."
git add .

# 2. Solicita a mensagem do commit
echo "💬 Digite a mensagem do seu commit:"
read -r commit_message

# Verifica se a mensagem não está vazia
if [ -z "$commit_message" ]; then
    echo "❌ Erro: A mensagem do commit não pode ser vazia!"
    exit 1
fi

# Realiza o commit
git commit -m "$commit_message"

# 3. Descobre a branch atual automaticamente para sugerir como padrão
current_branch=$(git branch --show-current)

echo "🌿 A branch atual é [$current_branch]. Pressione ENTER para confirmar ou digite o nome de outra branch:"
read -r target_branch

# Se o usuário só apertar ENTER, usa a branch atual
if [ -z "$target_branch" ]; then
    target_branch=$current_branch
fi

# 4. Realiza o push
echo "🚀 Enviando para a branch '$target_branch'..."
git push origin "$target_branch"

echo "======================================="
echo "✅ Tudo pronto! Seu código está no remoto."
echo "======================================="
