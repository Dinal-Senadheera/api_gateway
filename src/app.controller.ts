import { Controller, Delete, Get, Patch, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  COURSE_ENDPOINT = process.env.COURSE_ENDPOINT;
  ENROLLMENT_ENDPOINT = process.env.ENROLLMENT_ENDPOINT;
  NOTIFICATION_ENDPOINT = process.env.NOTIFICATION_ENDPOINT;

  @Get('/api/course/*')
  async getCourses(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/course', 'courses');
      console.log(urlPath);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Get('/api/course-content/*')
  async getCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Get('/api/course-progression/*')
  async getCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Get('/api/payment/*')
  async getPayments(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payment', 'payments');
      console.log(urlPath);

      const response = await axios.get(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/text-message-service/*')
  async sendTextMessage(@Req() req, @Res() res) {
    try {
      console.log('redirecting to text message service');
      const urlPath = req.originalUrl.replace(
        '/api/text-message-service',
        'text-message-service',
      );
      console.log(urlPath);

      const response = await axios.post(
        `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/email-service/*')
  async sendEmail(@Req() req, @Res() res) {
    try {
      console.log('redirecting to email service');
      const urlPath = req.originalUrl.replace(
        '/api/email-service',
        'email-service',
      );
      console.log(urlPath);

      const response = await axios.post(
        `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/course/*')
  async createCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/course', 'courses');
      console.log(urlPath);

      const response = await axios.post(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/course-content/*')
  async createCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.post(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/course-progression/*')
  async createCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.post(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Post('api/payment/*')
  async createPayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payment', 'payments');
      console.log(urlPath);

      const response = await axios.post(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Patch('api/course/*')
  async updateCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/course', 'courses');
      console.log(urlPath);

      const response = await axios.patch(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Patch('api/course-content/*')
  async updateCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.patch(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Patch('api/course-progression/*')
  async updateCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.patch(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Patch('api/payment/*')
  async updatePayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payment', 'payments');
      console.log(urlPath);

      const response = await axios.patch(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Delete('api/course/*')
  async deleteCourse(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/course', 'courses');
      console.log(urlPath);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Delete('api/course-content/*')
  async deleteCourseContent(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      console.log(urlPath);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Delete('api/course-progression/*')
  async deleteCourseProgression(@Req() req, @Res() res) {
    try {
      console.log('redirecting to course service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      console.log(urlPath);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  @Delete('api/payment/*')
  async deletePayment(@Req() req, @Res() res) {
    try {
      console.log('redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payment', 'payments');
      console.log(urlPath);

      const response = await axios.delete(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
