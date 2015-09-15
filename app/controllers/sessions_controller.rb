class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      email: params[:user][:email],
      password: params[:user][:password]
    )

    if @user
      sign_in @user
      flash[:notice] = ["Welcome back"]
      redirect_to :root
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    sign_out(@user)
    redirect_to new_session_url
  end

end
