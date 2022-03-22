class V1::TodosController < ApplicationController
    before_action :set_post, only: %i[show destroy update]

    def index
        todos = Todo.all.order(:id)
        render json: todos
    end

    def show
        render json: @todo
    end

    def create
        todo = Todo.new(todo_params)
        if todo.save
            render json: todo
        else
            render json: todo.errors
        end
    end

    def update
      if @todo.update(todo_params)
        render json: @todo
      else
        render json: @todo.errors
      end
    end
    
    def destroy
      if @todo.destroy
        render json: @todo
      else
        render json: @todo.errors
      end
    end
    
    private

    def set_post
      @todo = Todo.find(params[:id])
    end
  
    def todo_params
      params.require(:todo).permit(:content, :state)
    end
end
