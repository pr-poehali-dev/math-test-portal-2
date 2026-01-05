import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type LoginScreenProps = {
  nameInput: string;
  setNameInput: (value: string) => void;
  onLogin: () => void;
};

export const LoginScreen = ({ nameInput, setNameInput, onLogin }: LoginScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-2xl border-2">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce-in">
            <Icon name="Calculator" size={40} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
            Математика 6 класс
          </CardTitle>
          <CardDescription className="text-base">
            Тесты по работе с дробями
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ваше имя</label>
            <Input
              placeholder="Введите ваше имя..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLogin()}
              className="text-base"
            />
          </div>
          <Button 
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-lg h-12"
          >
            <Icon name="LogIn" size={20} className="mr-2" />
            Войти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
